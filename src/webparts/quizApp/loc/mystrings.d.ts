declare interface IQuizAppWebPartStrings {
	WebpartDescription: string;
	DataSourceGroup: {
		UserInfoDataSourceGroupName: string;
		UserInfoListCreationLabel: string;
		QuizDataSourceGroupName: string;
		QuizListCreationLabel: string;
		ListCreationTextInputLabel: string;
		ListPickerLabel: string;
		ListCreationLoadingText: string;
		ListCreationButtonText: string;
	};
}

declare module "QuizAppWebPartStrings" {
	const strings: IQuizAppWebPartStrings;
	export = strings;
}
