import * as React from "react";
import { WelcomeScreen } from "./WelcomeScreen/WelcomeScreen";
import { IQuizAppProps } from "./IQuizAppProps";
import { UserInfo } from "./UserInfo/UserInfo";
import { Placeholder } from "./Placeholder/Placeholder";
import { DisplayMode } from "@microsoft/sp-core-library";
import { useQuizAppStore } from "../Stores/QuizAppStore";
import styles from "./QuizApp.module.scss";
import { AllSetScreen } from "./AllSetScreen/AllSetScreen";
import { QuizScreen } from "./QuizScreen/QuizScreen";
import { ThankYouScreen } from "./ThankYouScreen/ThankYouScreen";

export const QuizApp: React.FC<IQuizAppProps> = (props: IQuizAppProps): JSX.Element => {
	const quizAppSubmissionStore = useQuizAppStore((state) => state);
	const _onConfigure = (): void => {
		props.context.propertyPane.open();
	};

	React.useEffect(() => {
		quizAppSubmissionStore.setUserInfoListId(props.userInfoListName);
		quizAppSubmissionStore.setQuizResultsListId(props.quizResultsListName);
	}, []);

	const getCurrentPageComponent = (): JSX.Element | null => {
		switch (quizAppSubmissionStore.currentPage) {
			case 1:
				return <WelcomeScreen />;
			case 2:
				return <UserInfo />;
			case 3:
				return <AllSetScreen />;
			case 4:
				return <QuizScreen context={props.context} />;
			case 5:
				return <ThankYouScreen />;
			default:
				return null;
		}
	};

	return (
		<div>
			{props.displayMode === DisplayMode.Edit ? (
				<Placeholder
					intent="info"
					heading="Configure your webpart"
					text="The Quiz webpart requires a set of configuration. You can click on the below button to configure your webpart."
					actions={[
						{
							type: "primary",
							text: "Configure",
							onClick: _onConfigure,
						},
					]}
				/>
			) : (
				<div className={styles.quizAppComponentContainer}>{getCurrentPageComponent()}</div>
			)}
		</div>
	);
};
