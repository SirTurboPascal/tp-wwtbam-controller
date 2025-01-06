import anime, { AnimeParams, AnimeTimelineInstance } from 'animejs';

import { eq } from 'lodash';
import { Logger } from 'tslog';

import { IQuestion } from '../interfaces';
import { AnswerLetterType } from '../types';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class QuestionController {
	private static readonly logger: Logger<QuestionController> = new Logger();

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
	 * Hides the body section of specified answer panels.
	 *
	 * This method sets the `display` style of the body section for the given answer panels
	 * to `none`, effectively hiding them from view. The panels are identified by their corresponding letters.
	 *
	 * @param answerLetters List of {@link AnswerLetterType}s
	 */
	public hideAnswerPanelBody(...answerLetters: AnswerLetterType[]): void {
		answerLetters.forEach((answerLetter) => {
			const answerPanelBodyElement: HTMLElement = document.querySelector(`div#answerPanelContainer${answerLetter} div.answer-panel__body`) as HTMLElement;

			QuestionController.logger.info(`Hiding answer panel body for letter [${answerLetter}]...`);
			answerPanelBodyElement.style.display = 'none';
		});
	}

	/**
	 * Hides the question panel and answer panels with an optional animation.
	 *
	 * This method animates the question panel and the answer panels by scaling them up and
	 * translating them downward. If the duration is set to `0`, the panels are instantly hidden
	 * without animation.
	 *
	 * @param duration The duration of the animation in milliseconds. If `0`, no animation is applied
	 * @returns A promise that resolves when the hiding animation is complete
	 */
	public async hideQuestionAndAnswerPanels(duration: number = 0): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			const animeParams: AnimeParams = {
				scale: 4,
				translateY: 400,
			};

			if (eq(duration, 0)) {
				anime.set(['div.question-panel', 'div.answer-panel'], animeParams);

				return resolve();
			}

			const timeline: AnimeTimelineInstance = anime.timeline({ easing: 'easeInOutQuad', duration });
			timeline.add({ targets: 'div.answer-panel--bottom', ...animeParams });
			timeline.add({ targets: 'div.answer-panel--top', ...animeParams }, duration * 0.125);
			timeline.add({ targets: 'div.question-panel', ...animeParams }, duration);

			timeline.finished.then(() => resolve());
		});

		return promise;
	}

	/**
	 * Locks in the final answer by adding a visual indicator to the corresponding answer panel.
	 *
	 * This method identifies the container element for the specified answer using its letter and adds
	 * the CSS class `answer-panel__container--final` to visually indicate that the answer is locked in.
	 *
	 * @param answerLetter The letter of the answer to lock in
	 */
	public lockInFinalAnswer(answerLetter: AnswerLetterType): void {
		const answerPanelContainerElement: HTMLElement = document.getElementById(`answerPanelContainer${answerLetter}`) as HTMLElement;

		QuestionController.logger.info(`Locking in answer [${answerLetter}]...`);
		answerPanelContainerElement.classList.add('answer-panel__container--final');
	}

	/**
	 * Reveals the body section of specified answer panels.
	 *
	 * This method sets the `display` style of the body section for the given answer panels
	 * to `'flex'`, making them visible. The panels are identified by their corresponding letters.
	 *
	 * @param answerLetters List of {@link AnswerLetterType}s
	 */
	public revealAnswerPanelBody(...answerLetters: AnswerLetterType[]): void {
		answerLetters.forEach((answerLetter) => {
			const answerPanelBodyElement: HTMLElement = document.querySelector(`div#answerPanelContainer${answerLetter} div.answer-panel__body`) as HTMLElement;

			QuestionController.logger.info(`Revealing answer panel body for letter [${answerLetter}]...`);
			answerPanelBodyElement.style.display = 'flex';
		});
	}

	/**
	 * Reveals the question panel and answer panels with an optional animation.
	 *
	 * This method animates the question panel and the answer panels by scaling them back
	 * to their original size and moving them to their default positions.
	 * If the duration is set to `0`, the panels are instantly revealed without animation.
	 *
	 * @param duration The duration of the animation in milliseconds. If `0`, no animation is applied
	 * @returns A promise that resolves when the hiding animation is complete
	 */
	public async revealQuestionAndAnswerPanels(duration: number = 0): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			const animeParams: AnimeParams = {
				scale: 1,
				translateY: 0,
			};

			if (eq(duration, 0)) {
				anime.set(['div.question-panel', 'div.answer-panel'], animeParams);

				return resolve();
			}

			const timeline: AnimeTimelineInstance = anime.timeline({ easing: 'easeInOutQuad', duration });
			timeline.add({ targets: 'div.question-panel', ...animeParams });
			timeline.add({ targets: 'div.answer-panel--top', ...animeParams }, duration * 0.875);
			timeline.add({ targets: 'div.answer-panel--bottom', ...animeParams }, duration);

			timeline.finished.then(() => resolve());
		});

		return promise;
	}

	/**
	 * Unlocks the final answer by removing the visual indicator from all answer panels.
	 *
	 * This method removes the CSS class `answer-panel__container--final` from all elements
	 * with the class `answer-panel__container`, effectively resetting the state of all answers
	 * to their default appearance.
	 */
	public unlockFinalAnswer(): void {
		QuestionController.logger.info('Unlocking final answer...');

		document.querySelectorAll('div.answer-panel__container').forEach((answerPanelContainerElement) => {
			answerPanelContainerElement.classList.remove('answer-panel__container--final');
		});
	}
}

export default QuestionController;
