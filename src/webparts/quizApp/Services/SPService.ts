import { spfi, SPFx, SPFI } from "@pnp/sp";
import { PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/views/list";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/attachments";
import "@pnp/sp/taxonomy";
import "@pnp/sp/fields";
import "@pnp/sp/search";
import "@pnp/sp/sites";
import "@pnp/sp/clientside-pages";
import "@pnp/sp/features";

import "@pnp/sp/site-groups/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient } from "@microsoft/sp-http";

export interface ISPService {
	sp: SPFI;
	getNewSP: (url: string) => SPFI;
	spHttpClient: SPHttpClient;
}

export class SPService implements ISPService {
	private static _instance: ISPService;
	public sp: SPFI;
	private _context: WebPartContext | ApplicationCustomizerContext;
	public spHttpClient: SPHttpClient;

	constructor(context: WebPartContext | ApplicationCustomizerContext) {
		this._context = context;
		this.sp = spfi().using(SPFx(context as WebPartContext));
		this.spHttpClient = context.spHttpClient as SPHttpClient;
	}

	public static getInstance(): ISPService {
		return SPService._instance;
	}

	public static setInstance(context: WebPartContext | ApplicationCustomizerContext): ISPService {
		if (!context) console.error("No spHttpClient or absoluteUrl provided");
		SPService._instance = new SPService(context);
		return SPService._instance;
	}

	public getNewSP = (url: string): SPFI => {
		return spfi(url)
			.using(SPFx(this._context as WebPartContext))
			.using(PnPLogging(99));
	};
}
