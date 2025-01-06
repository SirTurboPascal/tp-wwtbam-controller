import { isNull } from 'lodash';
import { Logger } from 'tslog';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class QuestionController {
	private static readonly logger: Logger<QuestionController> = new Logger();

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
