/*eslint-disable @typescript-eslint/no-explicit-any */
import { IQuizService } from "./IQuizService";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { IList, IListAddResult } from "@pnp/sp/lists";
import { IUserFormData } from "../components/UserInfo/IUserInfoProps";
import { IItemAddResult } from "@pnp/sp/items";
import { HttpClient } from "@microsoft/sp-http-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IQuizResults } from "../components/QuizScreen/IQuizScreenProps";

export class SharepointQuizService implements IQuizService {
	private static _instance: IQuizService;
	private _sp: SPFI;

	constructor(sp: SPFI) {
		this._sp = sp;
	}

	public static getInstance(): IQuizService {
		return SharepointQuizService._instance;
	}

	public static setInstance(sp: SPFI): IQuizService {
		SharepointQuizService._instance = new SharepointQuizService(sp);
		return SharepointQuizService._instance;
	}

	public async createNewList(
		spListTitle: string,
		spListDescription: string,
		spListTemplateId: number,
		spEnableCT: boolean,
		enableAttachments: boolean
	): Promise<IListAddResult> {
		return await this._sp.web.lists.add(spListTitle, spListDescription, spListTemplateId, spEnableCT, {
			EnableAttachments: enableAttachments,
		});
	}

	public async getListByTitle(listTitle: string): Promise<IList> {
		return await this._sp.web.lists.getByTitle(listTitle);
	}

	public async createListItems(listId: string, itemData: IUserFormData | IQuizResults): Promise<IItemAddResult> {
		return await this._sp.web.lists.getById(listId).items.add(itemData);
	}

	public async updateListItems(listId: string, itemId: number, itemData: IUserFormData): Promise<IItemAddResult> {
		return await this._sp.web.lists.getById(listId).items.getById(itemId).update(itemData);
	}

	public async getListItems(
		listId: string,
		select: string,
		expand: string,
		filter: string
	): Promise<IUserFormData[]> {
		const items: IUserFormData[] = await this._sp.web.lists
			.getById(listId)
			.items.select(select)
			.expand(expand)
			.filter(filter)();
		return items;
	}

	public async fetchRequest(
		context: WebPartContext,
		requestType: string,
		requestUrl: string,
		requestBody: any
	): Promise<any> {
		const requestHeaders: Headers = new Headers();
		requestHeaders.append("Content-type", "application/json");
		requestHeaders.append("accept", "application/json");
		requestHeaders.append("Access-Control-Allow-Origin", "*");
		if (requestType === "get") {
			const response = await context.httpClient.fetch(requestUrl, HttpClient.configurations.v1, {
				headers: requestHeaders,
				method: "GET",
			});
			return await response.json();
		} else {
			const response = await context.httpClient.post(requestUrl, HttpClient.configurations.v1, {
				body: requestBody,
				headers: requestHeaders,
				method: "GET",
			});
			return await response.json();
		}
	}
}
