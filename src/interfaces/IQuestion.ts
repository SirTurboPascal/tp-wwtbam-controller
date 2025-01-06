import IAnswer from './IAnswer';

interface IQuestion {
	text: string;

	answers: IAnswer[];
}

export default IQuestion;
