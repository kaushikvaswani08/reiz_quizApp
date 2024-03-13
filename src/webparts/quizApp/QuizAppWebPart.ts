import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
	PropertyPaneLabel,
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
	PropertyPaneButton,
	PropertyPaneButtonType,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import { QuizApp } from "./components/QuizApp";
import { IQuizAppProps } from "./components/IQuizAppProps";
import * as strings from "QuizAppWebPartStrings";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from "@pnp/spfx-property-controls";
import { Placeholder, PlaceholderProps } from "./components/Placeholder/Placeholder";
import { SPService } from "./Services/SPService";
import { SharepointQuizService } from "./Services/SharepointQuizService";
import { IQuizService } from "./Services/IQuizService";

export interface IQuizAppWebPartProps {
	userInfoListCreation: string;
	userInfoListCreationTextInput: string;
	userInfoList: string;
	quizListCreation: string;
	quizListCreationTextInput: string;
	quizList: string;
}

export default class QuizAppWebPart extends BaseClientSideWebPart<IQuizAppWebPartProps> {
	private _loading: boolean = false;
	private QuizServiceInstance: IQuizService;

	protected onInit(): Promise<void> {
		return super.onInit().then(async () => {
			const pnpInstance = SPService.setInstance(this.context);
			SharepointQuizService.setInstance(pnpInstance.sp);
			this.QuizServiceInstance = SharepointQuizService.getInstance();
		});
	}
	public render(): void {
		let element: React.ReactElement<IQuizAppProps | PlaceholderProps>;
		if (!this.properties.userInfoList || !this.properties.quizList) {
			element = React.createElement(Placeholder, {
				intent: "error",
				heading: "Missing Correct Configuration",
				text: "The Quiz webpart requires a set of configuration. You dont have the correct configuration. Please configure your correctly to continue using it",
			});
		} else {
			element = React.createElement(QuizApp, {
				context: this.context,
				displayMode: this.displayMode,
				userInfoListName: this.properties.userInfoList,
				quizResultsListName: this.properties.quizList,
			});
		}

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	private async _handleCreateQuizList(): Promise<void> {
		this._loading = true;
		const spListTitle = "QuizApp_" + this.properties.quizListCreationTextInput;
		const spListDescription = "A list for storing the quiz results of the user";
		const spListTemplateId = 100;
		const spEnableCT = false;

		await this.QuizServiceInstance.createNewList(
			spListTitle,
			spListDescription,
			spListTemplateId,
			spEnableCT,
			false
		);

		const quizJson =
			"<Field DisplayName='QuizJson' StaticName='QuizJson' Type='Note' RichText='FALSE' Required='FALSE' Name='QuizJson' />";

		const newlyCreatedList = await this.QuizServiceInstance.getListByTitle(spListTitle);
		await newlyCreatedList.fields.createFieldAsXml(quizJson);

		await newlyCreatedList.fields.addText("UserEmail", {
			Title: "UserEmail",
		});
		await newlyCreatedList.fields.addNumber("CorrectAnswers");
		await newlyCreatedList.fields.addNumber("WrongAnswers");
		await newlyCreatedList.fields.addNumber("TotalScore");

		await newlyCreatedList.defaultView.fields.add("UserEmail");
		await newlyCreatedList.defaultView.fields.add("CorrectAnswers");
		await newlyCreatedList.defaultView.fields.add("WrongAnswers");
		await newlyCreatedList.defaultView.fields.add("TotalScore");
		await newlyCreatedList.defaultView.fields.add("QuizJson");

		this.properties.quizListCreationTextInput = "";
		this._loading = false;
		this.onAfterPropertyPaneChangesApplied();
		this.context.propertyPane.close();
		this.context.propertyPane.open();
	}

	private async _handleCreateList(): Promise<void> {
		this._loading = true;

		const spListTitle = "QuizApp_" + this.properties.userInfoListCreationTextInput;
		const spListDescription = "A list for storing user information for the quiz webpart";
		const spListTemplateId = 100;
		const spEnableCT = false;

		await this.QuizServiceInstance.createNewList(
			spListTitle,
			spListDescription,
			spListTemplateId,
			spEnableCT,
			false
		);

		const aboutYouML =
			"<Field DisplayName='AboutYou' StaticName='AboutYou' Type='Note' RichText='FALSE' Required='FALSE' Name='AboutYou' />";

		const newlyCreatedList = await this.QuizServiceInstance.getListByTitle(spListTitle);
		await newlyCreatedList.fields.createFieldAsXml(aboutYouML);
		await newlyCreatedList.fields.addText("FirstName", {
			Title: "FirstName",
		});
		await newlyCreatedList.fields.addText("LastName", {
			Title: "LastName",
		});
		await newlyCreatedList.fields.addText("Email", {
			Title: "Email",
		});
		await newlyCreatedList.fields.addText("PhoneNumber", {
			Title: "PhoneNumber",
		});
		await newlyCreatedList.fields.addText("Country", {
			Title: "Country",
		});
		await newlyCreatedList.fields.addText("City", {
			Title: "City",
		});
		await newlyCreatedList.fields.addText("State", {
			Title: "State",
		});
		await newlyCreatedList.fields.addText("PostalCode", {
			Title: "PostalCode",
		});
		await newlyCreatedList.fields.addText("Gender", {
			Title: "Gender",
		});
		await newlyCreatedList.fields.addDateTime("DateOfBirth", {
			Title: "DateOfBirth",
		});

		await newlyCreatedList.defaultView.fields.add("AboutYou");
		await newlyCreatedList.defaultView.fields.add("FirstName");
		await newlyCreatedList.defaultView.fields.add("LastName");
		await newlyCreatedList.defaultView.fields.add("Email");
		await newlyCreatedList.defaultView.fields.add("PhoneNumber");
		await newlyCreatedList.defaultView.fields.add("Country");
		await newlyCreatedList.defaultView.fields.add("City");
		await newlyCreatedList.defaultView.fields.add("State");
		await newlyCreatedList.defaultView.fields.add("PostalCode");
		await newlyCreatedList.defaultView.fields.add("Gender");
		await newlyCreatedList.defaultView.fields.add("DateOfBirth");

		this.properties.userInfoListCreationTextInput = "";
		this._loading = false;
		this.onAfterPropertyPaneChangesApplied();
		this.context.propertyPane.close();
		this.context.propertyPane.open();
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.WebpartDescription,
					},
					displayGroupsAsAccordion: true,
					groups: [
						{
							isCollapsed: false,
							groupName: strings.DataSourceGroup.UserInfoDataSourceGroupName,
							groupFields: [
								PropertyPaneLabel("userInfoListCreation", {
									text: strings.DataSourceGroup.UserInfoListCreationLabel,
								}),
								PropertyPaneTextField("userInfoListCreationTextInput", {
									label: strings.DataSourceGroup.ListCreationTextInputLabel,
								}),
								PropertyPaneButton("userInfoListCreationButton", {
									text: this._loading
										? strings.DataSourceGroup.ListCreationLoadingText
										: strings.DataSourceGroup.ListCreationButtonText,
									buttonType: PropertyPaneButtonType.Primary,
									onClick: this._handleCreateList.bind(this),
									disabled:
										!this.properties.userInfoListCreationTextInput ||
										this.properties.userInfoListCreationTextInput.length === 0 ||
										this._loading,
								}),
								PropertyFieldListPicker("userInfoList", {
									label: strings.DataSourceGroup.ListPickerLabel,
									selectedList: this.properties.userInfoList,
									includeHidden: false,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									disabled: false,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									onGetErrorMessage: (value: string | string[]) => {
										if (!value) {
											return "Please select a list";
										}
										return "";
									},
									deferredValidationTime: 0,
									key: "listPickerFieldId",
								}),
							],
						},
						{
							isCollapsed: true,
							groupName: strings.DataSourceGroup.QuizDataSourceGroupName,
							groupFields: [
								PropertyPaneLabel("quizListCreation", {
									text: strings.DataSourceGroup.QuizListCreationLabel,
								}),
								PropertyPaneTextField("quizListCreationTextInput", {
									label: strings.DataSourceGroup.ListCreationTextInputLabel,
								}),
								PropertyPaneButton("quizListCreationButton", {
									text: this._loading
										? strings.DataSourceGroup.ListCreationLoadingText
										: strings.DataSourceGroup.ListCreationButtonText,
									buttonType: PropertyPaneButtonType.Primary,
									onClick: this._handleCreateQuizList.bind(this),
									disabled:
										!this.properties.quizListCreationTextInput ||
										this.properties.quizListCreationTextInput.length === 0 ||
										this._loading,
								}),
								PropertyFieldListPicker("quizList", {
									label: strings.DataSourceGroup.ListPickerLabel,
									selectedList: this.properties.quizList,
									includeHidden: false,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									disabled: false,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									onGetErrorMessage: (value: string | string[]) => {
										if (!value) {
											return "Please select a list";
										}
										return "";
									},
									deferredValidationTime: 0,
									key: "listPickerFieldId",
								}),
							],
						},
					],
				},
			],
		};
	}
}
