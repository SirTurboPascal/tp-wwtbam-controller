import anime, { AnimeParams, AnimeTimelineInstance } from 'animejs';

import { isUndefined } from 'lodash';
import { Logger } from 'tslog';

import { IQuestion } from '../interfaces';
import { AnswerLetterType } from '../types';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class QuestionController {
	private static readonly logger: Logger<QuestionController> = new Logger();

	private _animationInProgress: boolean;
	private _questionAndAnswerPanelsVisible: boolean;

	private _finalAnswerLetter: AnswerLetterType | undefined;

	/**
	 * Creates a new instance of the {@link QuestionController} class.
	 */
	public constructor() {
		QuestionController.logger.info('Initializing QuestionController...');

		this._animationInProgress = false;
		this._questionAndAnswerPanelsVisible = true;
	}

	/**
	 * Displays a question and its corresponding answers in the UI.
	 *
	 * This method updates the question text in the question panel and populates
	 * the answer panels with the corresponding answers provided in the {@link IQuestion} object.
	 * Each answer is displayed in its respective element based on its index.
	 *
	 * @param question {@link IQuestion}
	 */
	public displayQuestion(question: IQuestion): void {
		const { answers, text } = question;

		const questionPanelTextElement: HTMLElement = document.querySelector('div.question-panel__text') as HTMLElement;
		QuestionController.logger.info(`Updating question panel text to be [${text}]...`);
		questionPanelTextElement.textContent = text;

		questionPanelTextElement.classList.add();

		document.querySelectorAll('div.answer-panel__text').forEach((answerPanelTextElement, i) => {
			const { text } = answers[i];

			QuestionController.logger.info(`Updating answer panel text with index [${i}] to be [${text}]`);
			answerPanelTextElement.textContent = text;
		});
	}

	/**
	 * Sets the visibility of the body section of specified answer panels.
	 *
	 * This method iterates through the provided answer letters and either reveals or hides
	 * the body of the corresponding answer panel, depending on the `visible` parameter.
	 *
	 * @param visible Determines whether the answer panel bodies should be visible. Defaults to `true`.
	 * @param answerLetters A list of answer letters representing the panels to update.
	 */
	public setAnswerPanelBodyVisibility(visible: boolean = true, ...answerLetters: AnswerLetterType[]): void {
		answerLetters.forEach((answerLetter) => {
			const answerPanelBodyElement: HTMLElement = document.querySelector(`div#answerPanelContainer${answerLetter} div.answer-panel__body`) as HTMLElement;

			QuestionController.logger.info(`${visible ? 'Revealing' : 'Hiding'} answer panel body for letter [${answerLetter}]...`);
			answerPanelBodyElement.style.display = visible ? 'flex' : 'none';
		});
	}

	/**
	 * Sets or clears the final answer for a question.
	 *
	 * If an `answerLetter` is provided, this method locks in the specified answer by adding a visual
	 * indicator (`answer-panel__container--final`) to the corresponding answer panel and stores the
	 * answer as the final choice. If `undefined` is passed, it removes the visual indicator from all
	 * answer panels and clears the final answer.
	 *
	 * @param answerLetter The letter of the answer to lock in or `undefined` to unlock the final answer.
	 */
	public setFinalAnswer(answerLetter: AnswerLetterType | undefined): void {
		if (!isUndefined(answerLetter)) {
			const answerPanelContainerElement: HTMLElement = document.getElementById(`answerPanelContainer${answerLetter}`) as HTMLElement;

			QuestionController.logger.info(`Locking in answer [${answerLetter}]...`);
			answerPanelContainerElement.classList.add('answer-panel__container--final');
			this._finalAnswerLetter = answerLetter;

			return;
		}

		QuestionController.logger.info('Unlocking final asnwer...');
		document.querySelectorAll('div.answer-panel__container').forEach((answerPanelContainerElement) => {
			answerPanelContainerElement.classList.remove('answer-panel__container--final');
		});

		this._finalAnswerLetter = undefined;
	}

	/**
	 * Toggles the visibility of the question and answer panels with an optional animation.
	 *
	 * This method animates the scaling and position of the question and answer panels to either reveal
	 * or hide them, depending on the `visible` parameter. The animation duration can be customized.
	 * If another animation is already in progress, the method rejects the operation.
	 *
	 * @param visible Determines whether the panels should be visible. Defaults to `true`.
	 * @param duration The duration of the animation in milliseconds. Defaults to `0` for an instant change.
	 * @returns A promise that resolves when the animation is complete or rejects if another animation is in progress.
	 */
	public async setQuestionAndAnswerPanelVisibility(visible: boolean = true, duration: number = 0): Promise<void> {
		const promise: Promise<void> = new Promise((resolve, reject) => {
			if (this._animationInProgress) {
				const error: Error = new Error('Animation already in progress!');

				this._animationInProgress = false;
				this._questionAndAnswerPanelsVisible = visible;

				return reject(error);
			}

			this._animationInProgress = true;
			QuestionController.logger.info(`${visible ? 'Revealing' : 'Hiding'} the question and answer panels in an [${duration}ms] animation...`);

			const animeParams: AnimeParams = {
				scale: visible ? 1 : 4,
				translateY: visible ? 0 : 400,
			};

			const timeline: AnimeTimelineInstance = anime.timeline({ duration, easing: 'easeInOutQuint' });
			timeline.add({ targets: 'div.question-panel', ...animeParams }, visible ? 0 : duration);
			timeline.add({ targets: 'div.answer-panel--top', ...animeParams }, duration * (1 - (visible ? 0.125 : 0.875)));
			timeline.add({ targets: 'div.answer-panel--bottom', ...animeParams }, visible ? duration : 0);

			timeline.finished.then(() => {
				this._animationInProgress = false;
				this._questionAndAnswerPanelsVisible = visible;

				return resolve();
			});
		});

		return promise;
	}

	public get finalAnswerLetter(): AnswerLetterType | undefined {
		return this._finalAnswerLetter;
	}

	public get questionAndAnswerPanelsVisible(): boolean {
		return this._questionAndAnswerPanelsVisible;
	}
}

export default QuestionController;
