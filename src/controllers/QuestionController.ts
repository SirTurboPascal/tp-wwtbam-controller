import { isNull } from 'lodash';
import { Logger } from 'tslog';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class QuestionController {
	private static readonly logger: Logger<QuestionController> = new Logger();

	/**
	 * Updates the text content of a question panel element identified by a CSS selector.
	 *
	 * This method locates a DOM element using the provided selector and updates its text content
	 * to display the specified question panel text. If the element is not found, an error is logged.
	 *
	 * @param questionPanelText The text to be displayed in the question panel
	 * @param selector The CSS selector used to locate the question panel element
	 */
	public updateQuestionPanelText(questionPanelText: string, selector: string): void {
		const questionPanelTextElement: HTMLElement | null = document.querySelector(selector);

		if (isNull(questionPanelTextElement)) {
			QuestionController.logger.error(`No element for selector [${selector}] was found!`);

			return;
		}

		QuestionController.logger.info(`Updating question panel text to be [${questionPanelText}]...`);
		questionPanelTextElement.textContent = questionPanelText;
	}
}

export default QuestionController;
