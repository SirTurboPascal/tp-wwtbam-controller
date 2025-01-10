import { Howl } from 'howler';
import { isUndefined } from 'lodash';
import { Logger } from 'tslog';

import { BedAudioFileNameType, FinalAnswerAudioFileNameType, LightsDownAudioFileNameType } from '../types';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class AudioController {
	private static readonly logger: Logger<AudioController> = new Logger();

	private _backgroundSound: Howl | undefined;

	private readonly _bedSounds: Record<string, Howl>;
	private readonly _finalAnswerSounds: Record<string, Howl>;
	private readonly _lightsDownSounds: Record<string, Howl>;

	/**
	 * Creates a new instance of the {@link AudioController} class.
	 */
	public constructor() {
		AudioController.logger.info('Initializing AudioController...');

		this._bedSounds = this.initializeBedSounds();
		this._finalAnswerSounds = this.initializeFinalAnswerSounds();
		this._lightsDownSounds = this.initializeLightsDownSounds();
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

				this._backgroundSound = this._bedSounds[key];

				AudioController.logger.info(`Now playing bed sound with key [${key}] as a background sound...`);
				this._backgroundSound.play();

				return resolve();
			});
		});

		return promise;
	}

	/**
	 * Plays the "Explain the Knockout Game" background sound.
	 *
	 * This method initializes and plays an audio file explaining the knockout game. It ensures
	 * the audio context is resumed before playback begins and uses the `Howl` library to
	 * load and play the sound file.
	 *
	 * @returns A promise that resolves once the audio playback has started
	 */
	public async playExplainTheKnockoutGameSound(): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			this.resumeAudioContext().then(() => {
				this._backgroundSound = new Howl({ src: '/audio/common/explain-the-knockout-game.mp3', preload: true });

				AudioController.logger.info('Now playing the explain the knockout game sound as background sound...');
				this._backgroundSound.play();

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
	 * @returns A promise that resolves once the audio playback has started
	 */
	public async playFinalSound(key: FinalAnswerAudioFileNameType): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			this.resumeAudioContext().then(() => {
				this.stopBackgroundSound();

				this._backgroundSound = this._finalAnswerSounds[key];

				AudioController.logger.info(`Now playing final answer sound with key [${key}] as a background sound...`);
				this._backgroundSound.play();

				return resolve();
			});
		});

		return promise;
	}

	/**
	 * Plays a lights down background sound based on the specified key.
	 *
	 * This method stops any currently playing background sound, resumes the audio context,
	 * and then plays the "Lights Down" sound associated with the provided key. The sound
	 * is managed using the `_lightsDownSounds` mapping.
	 *
	 * @param key The key representing the final answer sound to play
	 * @returns A promise that resolves once the audio playback has started
	 */
	public async playLightsDownSound(key: LightsDownAudioFileNameType): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			this.resumeAudioContext().then(() => {
				this.stopBackgroundSound();

				this._backgroundSound = this._lightsDownSounds[key];

				AudioController.logger.info(`Now playing lights down sound with key [${key}] as a background sound...`);
				this._backgroundSound.play();

				return resolve();
			});
		});

		return promise;
	}

	/**
	 * Plays a sound from the specified source file.
	 *
	 * This method resumes the audio context before initializing and playing the sound using the `Howl` library.
	 * The provided source (`src`) is preloaded for smoother playback.
	 *
	 * @param src The file path or URL of the audio file to be played
	 * @returns A promise that resolves once the sound playback has started
	 */
	public async playSound(src: string): Promise<void> {
		const promise: Promise<void> = new Promise((resolve) => {
			this.resumeAudioContext().then(() => {
				new Howl({ src, preload: true }).play();

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
		if (!isUndefined(this._backgroundSound)) {
			AudioController.logger.info('Stopping the currently playing background sound...');

			this._backgroundSound.stop();
		}

		this._backgroundSound = undefined;
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

	private initializeLightsDownSounds(): Record<LightsDownAudioFileNameType, Howl> {
		const lightsDownSounds: Record<string, Howl> = {};

		for (let i: number = 0; i < 5; i++) {
			const key: string = `lights-down-${i + 1}`;
			const src: string = `/audio/lights-down/${key}.mp3`;

			AudioController.logger.info(`Registering audio file [${src}] under key [${key}]...`);
			lightsDownSounds[key] = new Howl({ src, preload: true });
		}

		return lightsDownSounds;
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
