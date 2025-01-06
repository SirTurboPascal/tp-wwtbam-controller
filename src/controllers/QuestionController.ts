import { Logger } from 'tslog';

import IQuestion from '../interfaces/IQuestion';

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

		document.querySelectorAll('div.answer-panel__text').forEach((answerPanelTextElement, i) => {
			const { text } = answers[i];

			QuestionController.logger.info(`Updating answer panel text with index [${i}] to be [${text}]`);
			answerPanelTextElement.textContent = text;
		});
	}
}

export default QuestionController;
