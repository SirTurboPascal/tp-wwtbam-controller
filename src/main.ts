import './assets/stylesheets/index.css';

import QuestionController from './controllers/QuestionController';
import StageController from './controllers/StageController';

const stageController: StageController = new StageController();
stageController.startSpawningCurrencySigns('$', 'div.currency-sign-spawner__container');

const questionController: QuestionController = new QuestionController();
questionController.updateQuestionPanelText(
	'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus mollitia fugiat minima?', //
	'div.question-panel__text', //
);
