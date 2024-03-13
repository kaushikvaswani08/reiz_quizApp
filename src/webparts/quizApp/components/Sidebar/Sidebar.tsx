import { INavLink, Nav, useTheme } from "@fluentui/react";
import * as React from "react";
import { Route, useNavigationStore } from "../../Stores/NavigationStore";
import { useQuizAppStore } from "../../Stores/QuizAppStore";

interface ISideBarProps {
	currentQuestion: string;
}

type icon = {
	iconName: string;
	styles: {
		root: {
			color: string;
		};
	};
};

export const RouteArray = [
	"Question1",
	"Question2",
	"Question3",
	"Question4",
	"Question5",
	"Question6",
	"Question7",
	"Question8",
];

export const Sidebar = (props: ISideBarProps): JSX.Element => {
	const theme = useTheme();
	const navigationStore = useNavigationStore((state) => state);
	const quizAppSubmissionStore = useQuizAppStore((state) => state);
	const getIcon = (view: string): icon => {
		return {
			iconName:
				quizAppSubmissionStore.userAnsweredQuizData.find((res) => res.questionId === view)?.userAnswer ||
					RouteArray.indexOf(view) === RouteArray.indexOf(navigationStore.currentQuestion)
					? "FullCircleMask"
					: "LocationCircle",
			styles: {
				root: {
					color: quizAppSubmissionStore.userAnsweredQuizData.find((res) => res.questionId === view)
						?.userAnswer
						? theme.palette.themePrimary
						: RouteArray.indexOf(view) === RouteArray.indexOf(navigationStore.currentQuestion)
							? "#ffcb00"
							: "",
				},
			},
		};
	};

	const defaultlinks = RouteArray.map((e: string, index: number) => {
		return {
			name: `Question ${index + 1}`,
			iconProps: getIcon(e),
			key: e,
			url: "",
			title: "",
		};
	});

	const navigate = (i: INavLink | undefined): void => {
		navigationStore.navigate(i?.key as Route, undefined);
	};

	return (
		<div style={{ width: "15%" }}>
			<Nav
				styles={{
					link: {
						whiteSpace: "normal",
						lineHeight: "inherit",
					},
				}}
				groups={[
					{
						links: defaultlinks,
					},
				]}
				selectedKey={navigationStore.currentQuestion}
				onLinkClick={(e, i) => navigate(i)}
			/>
		</div>
	);
};
