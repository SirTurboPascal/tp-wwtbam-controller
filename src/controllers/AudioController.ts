import { Howl } from 'howler';
import { isUndefined } from 'lodash';
import { Logger } from 'tslog';

import { BedAudioFileNameType, FinalAnswerAudioFileNameType } from '../types';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class AudioController {
	private static readonly logger: Logger<AudioController> = new Logger();

	private backgroundSound: Howl | undefined;

	private readonly bedSounds: Record<string, Howl>;
	private readonly finalAnswerSounds: Record<string, Howl>;

	/**
	 * Creates a new instance of the {@link AudioController} class.
	 */
	public constructor() {
		AudioController.logger.info('Initializing AudioController...');

		this.bedSounds = this.initializeBedSounds();
		this.finalAnswerSounds = this.initializeFinalAnswerSounds();
	}

	/**
	 * Plays a specified bed sound as the background sound asynchronously.
	 *
	 * This method ensures that the audio context is resumed. After resuming the audio
	 * context, it stops any currently playing background sound, sets the new background
	 * sound based on the provided `key`, and starts playing it.
	 *
	 * @param key The key representing the bed sound to play
	 * @returns A promise that resolves once the audio context is resumed.
	 */
	public async playBedSound(key: BedAudioFileNameType): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			this.resumeAudioContext().then(() => {
				this.stopBackgroundSound();

				this.backgroundSound = this.bedSounds[key];

				AudioController.logger.info(`Now playing bed sound with key [${key}] as a background sound...`);
				this.backgroundSound.play();

				return resolve();
			});
		});

		return promise;
	}

	public async playExplainTheKnockoutGameSound(): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			this.resumeAudioContext().then(() => {
				this.backgroundSound = new Howl({ src: '/audio/common/explain-the-knockout-game.mp3', preload: true });

				AudioController.logger.info('Now playing the explain the knockout game sound as background sound...');
				this.backgroundSound.play();

				return resolve();
			});
		});

		return promise;
	}

	/**
	 * Plays a specified final answer sound as the background sound asynchronously.
	 *
	 * This method ensures that the audio context is resumed. After resuming the audio
	 * context, it stops any currently playing background sound, sets the new background
	 * sound based on the provided `key`, and starts playing it.
	 *
	 * @param key The key representing the final answer sound to play
	 * @returns A promise that resolves once the audio context is resumed.
	 */
	public async playFinalSound(key: FinalAnswerAudioFileNameType): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			this.resumeAudioContext().then(() => {
				this.stopBackgroundSound();

				this.backgroundSound = this.finalAnswerSounds[key];

				AudioController.logger.info(`Now playing final answer sound with key [${key}] as a background sound...`);
				this.backgroundSound.play();

				return resolve();
			});
		});

		return promise;
	}

	/**
	 * Stops the background sound and resets the sound instance.
	 *
	 * This method checks if a background sound is currently playing. If so, it stops
	 * the playback and sets the `backgroundSound` property to `undefined`, effectively
	 * releasing the sound instance.
	 */
	public stopBackgroundSound(): void {
		if (!isUndefined(this.backgroundSound)) {
			AudioController.logger.info('Stopping the currently playing background sound...');

			this.backgroundSound.stop();
		}

		this.backgroundSound = undefined;
	}

	private initializeBedSounds(): Record<BedAudioFileNameType, Howl> {
		const bedSounds: Record<string, Howl> = {};

		for (let i: number = 0; i < 11; i++) {
			const key: string = i === 0 ? 'q1-to-q5-bed' : `q${i + 5}-bed`;
			const src: string = `/audio/bed/${key}.mp3`;

			AudioController.logger.info(`Registering audio file [${src}] under key [${key}]...`);
			bedSounds[key] = new Howl({ src, preload: true });
		}

		return bedSounds;
	}

	private initializeFinalAnswerSounds(): Record<FinalAnswerAudioFileNameType, Howl> {
		const finalAnswerSounds: Record<string, Howl> = {};

		for (let i: number = 0; i < 5; i++) {
			const key: string = `final-answer-${i + 1}`;
			const src: string = `/audio/final-answer/${key}.mp3`;

			AudioController.logger.info(`Registering audio file [${src}] under key [${key}]...`);
			finalAnswerSounds[key] = new Howl({ src, preload: true });
		}

		return finalAnswerSounds;
	}

	private async resumeAudioContext(): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			const audioContextState: AudioContextState = Howler.ctx.state;

			if (audioContextState === 'running') {
				return resolve();
			}

			Howler.ctx.resume().then(() => resolve());
		});

		return promise;
	}
}

export default AudioController;
