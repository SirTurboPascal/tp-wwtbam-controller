import './assets/stylesheets/index.css';

import StageController from './controllers/StageController';

const stageController: StageController = new StageController();
stageController.startSpawningCurrencySigns('$', 'div.currency-sign-spawner__container');

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight') stageController.stopSpawningCurrencySigns();
});
