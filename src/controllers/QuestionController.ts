import { Logger } from 'tslog';

import IQuestion from '../interfaces/IQuestion';

import AnswerLetterType from '../types/AnswerLetterType';

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
}

export default QuestionController;
