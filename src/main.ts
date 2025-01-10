import './assets/stylesheets/index.css';

import { AudioController, MoneyTreeController, QuestionController, StageController } from './controllers';
import { IQuestion } from './interfaces';
import { AnswerLetterType } from './types';

const audioController: AudioController = new AudioController();
const moneyTreeController: MoneyTreeController = new MoneyTreeController();
const questionController: QuestionController = new QuestionController();
const stageController: StageController = new StageController();

moneyTreeController.setMoneyTreePanelVisibility(false);
questionController.setAnswerPanelBodyVisibility(false, 'A', 'B', 'C', 'D');
questionController.setQuestionAndAnswerPanelVisibility(false);

const question: IQuestion = {
	text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolorem itaque excepturi?',

	answers: ['Minima dolor', 'Totam dicta', 'Pariatur dolorem', 'Quod unde'].map((text) => {
		return { text };
	}),
};

let counter: number = 0;

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight') {
		if (counter === 0) {
			stageController.startSpawningCurrencySigns('$', 'div.currency-sign-spawner__container');

			audioController.playExplainTheKnockoutGameSound().then(() => {
				moneyTreeController.setMoneyTreePanelVisibility(true, 2000);
			});
		} else if (counter === 1) {
			moneyTreeController.setMoneyTreePanelVisibility(false);
		} else if (counter === 2) {
			audioController.playLightsDownSound('lights-down-3');
		} else if (counter === 3) {
			audioController.playBedSound('q8-bed').then(() => {
				questionController.displayQuestion(question);
				questionController.setQuestionAndAnswerPanelVisibility(true, 800);
			});
		} else if (counter > 3 && counter < 8) {
			const answerLetters: AnswerLetterType[] = ['A', 'B', 'C', 'D'];

			questionController.setAnswerPanelBodyVisibility(true, answerLetters[counter - 4]);
		} else if (counter === 8) {
			audioController.stopBackgroundSound();
			questionController.setAnswerPanelBodyVisibility(false, 'A', 'B', 'C', 'D');
			questionController.setQuestionAndAnswerPanelVisibility(false);
			stageController.stopSpawningCurrencySigns();
		}

		counter = counter === 8 ? 0 : counter + 1;
	}

	if (event.key === '1') {
		if (counter !== 8) return;

		audioController.playFinalSound('final-answer-3').then(() => {
			questionController.setFinalAnswer('A');
		});
	}

	if (event.key === '2') {
		if (counter !== 8) return;

		audioController.playFinalSound('final-answer-3').then(() => {
			questionController.setFinalAnswer('B');
		});
	}

	if (event.key === '3') {
		if (counter !== 8) return;

		audioController.playFinalSound('final-answer-3').then(() => {
			questionController.setFinalAnswer('C');
		});
	}

	if (event.key === '4') {
		if (counter !== 8) return;

		audioController.playFinalSound('final-answer-3').then(() => {
			questionController.setFinalAnswer('D');
		});
	}

	if (event.key === 'u') {
		if (counter !== 8) return;

		audioController.playBedSound('q8-bed').then(() => {
			questionController.setFinalAnswer(undefined);
		});
	}
});
