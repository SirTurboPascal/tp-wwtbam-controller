import './assets/stylesheets/index.css';

import { AudioController, QuestionController, StageController } from './controllers';
import { IQuestion } from './interfaces';
import { AnswerLetterType } from './types';

const audioController: AudioController = new AudioController();
const questionController: QuestionController = new QuestionController();
const stageController: StageController = new StageController();

stageController.startSpawningCurrencySigns('$', 'div.currency-sign-spawner__container');

const question: IQuestion = {
	text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sint eligendi consequatur?',

	answers: ['Cupiditate veritatis', 'At aperiam', 'Dolorem enim', 'Distinctio ducimus'].map((text) => {
		return { text };
	}),
};

questionController.displayQuestion(question);
questionController.hideAnswerPanelBody('A', 'B', 'C', 'D');
questionController.hideQuestionAndAnswerPanels();

let counter: number = 0;

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight') {
		if (counter === 0) {
			audioController.playBedSound('q11-bed').then(() => {
				questionController.revealQuestionAndAnswerPanels(700);
			});
		} else if (counter > 0 && counter < 5) {
			const answerLetters: AnswerLetterType[] = ['A', 'B', 'C', 'D'];
			questionController.revealAnswerPanelBody(answerLetters[counter - 1]);
		} else if (counter === 5) {
			audioController.stopBackgroundSound();
			questionController.hideQuestionAndAnswerPanels();
			questionController.hideAnswerPanelBody('A', 'B', 'C', 'D');
			questionController.unlockFinalAnswer();
		}

		counter = counter === 5 ? 0 : counter + 1;
	}

	if (event.key === '1') {
		audioController.playFinalSound('final-answer-1').then(() => {
			questionController.lockInFinalAnswer('A');
		});
	}

	if (event.key === '2') {
		audioController.playFinalSound('final-answer-1').then(() => {
			questionController.lockInFinalAnswer('B');
		});
	}

	if (event.key === '3') {
		audioController.playFinalSound('final-answer-1').then(() => {
			questionController.lockInFinalAnswer('C');
		});
	}

	if (event.key === '4') {
		audioController.playFinalSound('final-answer-1').then(() => {
			questionController.lockInFinalAnswer('D');
		});
	}

	if (event.key === 'u') {
		audioController.playBedSound('q11-bed').then(() => {
			questionController.unlockFinalAnswer();
		});
	}
});
