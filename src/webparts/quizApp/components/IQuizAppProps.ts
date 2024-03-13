import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IQuizAppProps {
	context: WebPartContext;
	displayMode: DisplayMode;
	userInfoListName: string;
	quizResultsListName: string;
}
