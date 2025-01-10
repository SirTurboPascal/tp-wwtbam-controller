import anime, { AnimeParams, AnimeTimelineInstance } from 'animejs';

import { eq } from 'lodash';
import { Logger } from 'tslog';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class MoneyTreeController {
	private static readonly logger: Logger<MoneyTreeController> = new Logger();

	private _animationInProgress: boolean;
	private _moneyTreePanelVisible: boolean;

	/**
	 * Creates a new instance of the {@link MoneyTreeController} class.
	 */
	public constructor() {
		MoneyTreeController.logger.info('Initializing MoneyTreeController...');

		this._animationInProgress = false;
		this._moneyTreePanelVisible = true;
	}

	/**
	 * Toggles the visibility of the money tree panel with an optional animation.
	 *
	 * This method animates the horizontal movement of the money tree panel to either reveal
	 * or hide it, depending on the `visible` parameter. The animation duration can be customized.
	 * If an animation is already in progress, the method rejects the operation.
	 *
	 * @param visible Determines whether the money tree panel should be visible. Defaults to `true`.
	 * @param duration The duration of the animation in milliseconds. Defaults to `0` for an instant change.
	 * @returns A promise that resolves when the animation is complete or rejects if another animation is in progress.
	 */
	public async setMoneyTreePanelVisibility(visible: boolean = true, duration: number = 0): Promise<void> {
		const promise: Promise<void> = new Promise((resolve, reject) => {
			if (this._animationInProgress) {
				const error: Error = new Error('Animation already in progress!');

				return reject(error);
			}

			this._animationInProgress = true;
			MoneyTreeController.logger.info(`${visible ? 'Revealing' : 'Hiding'} the money tree panel in an [${duration}ms] animation...`);

			const animeParams: AnimeParams = {
				translateX: visible ? 0 : '100%',
			};

			if (eq(duration, 0)) {
				anime.set('div.money-tree-panel', animeParams);

				this._animationInProgress = false;
				this._moneyTreePanelVisible = visible;

				return resolve();
			}

			const timeline: AnimeTimelineInstance = anime.timeline({ duration, easing: 'easeInOutQuad' });
			timeline.add({ targets: 'div.money-tree-panel', ...animeParams });

			timeline.finished.then(() => {
				this._animationInProgress = false;
				this._moneyTreePanelVisible = visible;

				return resolve();
			});
		});

		return promise;
	}

	public get moneyTreeVisible(): boolean {
		return this._moneyTreePanelVisible;
	}
}

export default MoneyTreeController;
