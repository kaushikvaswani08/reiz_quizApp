/*eslint-disable @typescript-eslint/no-explicit-any */
import { IList, IListAddResult } from "@pnp/sp/lists";
import { IUserFormData } from "../components/UserInfo/IUserInfoProps";
import { IItemAddResult } from "@pnp/sp/items";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IQuizResults } from "../components/QuizScreen/IQuizScreenProps";

export interface IQuizService {
	createNewList(
		spListTitle: string,
		spListDescription: string,
		spListTemplateId: number,
		spEnableCT: boolean,
		enableAttachments: boolean
	): Promise<IListAddResult>;
	getListByTitle(listTitle: string): Promise<IList>;
	createListItems(listId: string, itemData: IUserFormData | IQuizResults): Promise<IItemAddResult>;
	updateListItems(listId: string, itemId: number, itemData: IUserFormData): Promise<IItemAddResult>;
	getListItems(listId: string, select: string, expand: string, filter: string): Promise<IUserFormData[]>;
	fetchRequest(context: WebPartContext, requestType: string, requestUrl: string, requestBody: any): Promise<any>;
}
