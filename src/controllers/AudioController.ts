import { Howl } from 'howler';
import { isUndefined } from 'lodash';
import { Logger } from 'tslog';

import { BedAudioFileNameType } from '../types';

/**
 * @author Theo Gernke
 * @version 0.1.0
 */
class AudioController {
	private static readonly logger: Logger<AudioController> = new Logger();

	/** {@link Howl} or `undefined` */
	private backgroundSound: Howl | undefined;

	/** {@link Record} of strings and {@link Howl}s */
	private readonly bedSounds: Record<string, Howl>;

	/**
	 * Creates a new instance of the {@link AudioController} class.
	 */
	public constructor() {
		this.bedSounds = this.initializeBedSounds();
	}

	/**
	 * Plays a specified bed sound as the background sound.
	 *
	 * This method stops any currently playing background sound, sets the new background sound based
	 * on the provided `key`, and starts playing it. The available sounds are mapped to the keys
	 * defined in `BedAudioFileNameType`.
	 *
	 * @param key The key representing the bed sound to play
	 */
	public playBedSound(key: BedAudioFileNameType): void {
		this.stopBackgroundSound();

		this.backgroundSound = this.bedSounds[key];

		AudioController.logger.info(`Now playing bed sound with key [${key}] as a background sound...`);
		this.backgroundSound.play();
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
			bedSounds[key] = new Howl({ src });
		}

		return bedSounds;
	}
}

export default AudioController;
