import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IQuizScreenProps {
	context: WebPartContext;
}

export interface IQuizResults {
	UserEmail: string;
	QuizJson: string;
	CorrectAnswers: number;
	WrongAnswers: number;
	TotalScore: number;
}
