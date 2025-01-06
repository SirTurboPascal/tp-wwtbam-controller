import anime from 'animejs';

import { isNull } from 'lodash';
import { Logger } from 'tslog';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class StageController {
	private static readonly logger: Logger<StageController> = new Logger();

	/** Currency sign spawning interval */
	private interval: number | undefined;

	/**
	 * Starts spawning animated currency sign elements within a specified container element.
	 *
	 * This method periodically creates and animates currency sign elements within the bounds
	 * of the specified container element, using a CSS selector to locate the container
	 * Eachcurrency sign appears at a random position inside the container and animates upward
	 * while fading in and out.
	 *
	 * @param currencySign The currency sign to be displayed in each animated element
	 * @param selector The CSS selector used to locate the container element where the currency signs will spawn
	 */
	public startSpawningCurrencySigns(currencySign: string, selector: string): void {
		this.spawnCurrencySign(currencySign, selector);

		this.interval = setInterval(() => {
			this.spawnCurrencySign(currencySign, selector);
		}, 250);
	}

	/**
	 * Stops the periodic spawning of animated currency sign elements.
	 *
	 * This method clears the interval that was set by `startSpawningCurrencySigns`, effectively
	 * stopping the creation and animation of new currency sign elements.
	 */
	public stopSpawningCurrencySigns(): void {
		StageController.logger.info('Stopping to spawn currency signs...');

		clearInterval(this.interval);
	}

	private spawnCurrencySign(currencySign: string, selector: string): void {
		const currencySignSpawnerElement: HTMLElement | null = document.querySelector(selector);

		if (isNull(currencySignSpawnerElement)) {
			StageController.logger.error(`No element for selector [${selector}] was found!`);

			return;
		}

		const currencySignElement: HTMLElement = document.createElement('div');
		currencySignElement.classList.add('absolute', 'top-0', 'opacity-0', 'text-brightblue', 'blur-sm', 'font-nunito', 'font-bold');
		currencySignElement.textContent = currencySign;

		const fontSize: number = Math.random() * 200;
		currencySignElement.style.fontSize = `${fontSize}px`;

		const x: number = Math.random() * currencySignSpawnerElement.offsetWidth;
		const y: number = Math.random() * currencySignSpawnerElement.offsetHeight;

		currencySignElement.style.top = `${y}px`;
		currencySignElement.style.left = `${x}px`;

		currencySignSpawnerElement.appendChild(currencySignElement);

		anime({
			targets: currencySignElement,
			duration: 10000,
			easing: 'linear',

			opacity: [0, 0.5, 0],
			translateY: fontSize * -2,

			complete: () => {
				currencySignElement.remove();
			},
		});
	}
}

export default StageController;
