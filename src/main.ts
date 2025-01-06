import './assets/stylesheets/index.css';

import QuestionController from './controllers/QuestionController';
import StageController from './controllers/StageController';

import IQuestion from './interfaces/IQuestion';

const question: IQuestion = {
	text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sint eligendi consequatur?',

	answers: ['Cupiditate veritatis', 'At aperiam', 'Dolorem enim', 'Distinctio ducimus'].map((text) => {
		return { text };
	}),
};

const questionController: QuestionController = new QuestionController();
questionController.displayQuestion(question);

const stageController: StageController = new StageController();
stageController.startSpawningCurrencySigns('$', 'div.currency-sign-spawner__container');
