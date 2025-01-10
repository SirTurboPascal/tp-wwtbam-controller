import './assets/stylesheets/index.css';

import { AudioController, MoneyTreeController, QuestionController, StageController } from './controllers';
import { AnswerLetterType } from './types';

const audioController: AudioController = new AudioController();
const moneyTreeController: MoneyTreeController = new MoneyTreeController();
const questionController: QuestionController = new QuestionController();
const stageController: StageController = new StageController();

moneyTreeController.setMoneyTreePanelVisibility(false);
questionController.setAnswerPanelBodyVisibility(false, 'A', 'B', 'C', 'D');
questionController.setQuestionAndAnswerPanelVisibility(false);
stageController.startSpawningCurrencySigns('$', 'div.currency-sign-spawner__container');

let counter: number = 0;

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight') {
		if (counter === 0) {
			audioController.playExplainTheKnockoutGameSound().then(() => {
				moneyTreeController.setMoneyTreePanelVisibility(true, 2000);
			});
		} else if (counter === 1) {
			audioController.stopBackgroundSound();
			moneyTreeController.setMoneyTreePanelVisibility(false);
		} else if (counter === 2) {
			audioController.playBedSound('q1-to-q5-bed').then(() => {
				questionController.setQuestionAndAnswerPanelVisibility(true, 800);
			});
		} else if (counter > 2 && counter < 7) {
			const answerLetters: AnswerLetterType[] = ['A', 'B', 'C', 'D'];

			questionController.setAnswerPanelBodyVisibility(true, answerLetters[counter - 3]);
		} else if (counter === 7) {
			audioController.stopBackgroundSound();
			questionController.setAnswerPanelBodyVisibility(false, 'A', 'B', 'C', 'D');
			questionController.setQuestionAndAnswerPanelVisibility(false);
		}

		counter = counter === 7 ? 0 : counter + 1;
	}
});
