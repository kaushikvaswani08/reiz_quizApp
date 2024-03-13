import * as React from "react";
import { Stack, Text, Icon, useTheme, mergeStyleSets } from "@fluentui/react";
import { IThankYouScreenProps } from "./IThankYouScreenProps";
import styles from "./ThankYouScreen.module.scss";
import { useQuizAppStore } from "../../Stores/QuizAppStore";

export const ThankYouScreen: React.FC<IThankYouScreenProps> = (props: IThankYouScreenProps): JSX.Element => {
	const theme = useTheme();
	const quizAppSubmissionStore = useQuizAppStore((state) => state);
	const classes = mergeStyleSets({
		root: {
			borderRadius: 16,
			backgroundColor: theme.palette.neutralLighter,
			minHeight: 400,
			padding: 32,
			paddingTop: 65,
		},
	});

	const clsx = (...classNames: (string | undefined)[]): string => classNames.filter(Boolean).join(" ");

	return (
		<Stack
			className={clsx(styles.allSetScreenContainer, classes.root)}
			tokens={{ childrenGap: 20 }}
			horizontalAlign="center"
		>
			<Icon
				iconName="SkypeCircleCheck"
				className={styles.icon}
				styles={{ root: { color: theme.palette.themePrimary } }}
			/>
			<Stack tokens={{ childrenGap: 10 }} styles={{ root: { textAlign: "center" } }}>
				<Text variant="xxLarge" className={styles.title}>
					You are done
				</Text>
				<Text variant="medium" className={styles.description}>
					Thank you for taking the quiz. Below are the results.
				</Text>
			</Stack>
			<Stack horizontal styles={{ root: { justifyContent: "space-evenly", width: "30%" } }}>
				<Stack>
					<Icon iconName="BoxCheckmarkSolid" className={styles.icon} styles={{ root: { color: "rgb(16, 124, 16)" } }} />
					<Text variant="large">{quizAppSubmissionStore.quizResults.CorrectAnswers}</Text>
				</Stack>
				<Stack>
					<Icon iconName="BoxMultiplySolid" className={styles.icon} styles={{ root: { color: "rgb(168, 0, 0)" } }} />
					<Text variant="large">{quizAppSubmissionStore.quizResults.WrongAnswers}</Text>
				</Stack>
			</Stack>
			<Text variant="large" className={styles.description}>
				{`Total Score: ${quizAppSubmissionStore.quizResults.TotalScore}`}
			</Text>
		</Stack>
	);
};
