import * as React from "react";
import styles from "./WelcomeScreen.module.scss";
import { Stack, Text, PrimaryButton, Icon, useTheme, mergeStyleSets } from "@fluentui/react";
import { IWelcomeScreenProps } from "./IWelcomeScreenProps";
import { useQuizAppStore } from "../../Stores/QuizAppStore";

export const WelcomeScreen: React.FC<IWelcomeScreenProps> = (props: IWelcomeScreenProps): JSX.Element => {
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
			className={clsx(styles.welcomeScreenContainer, classes.root)}
			tokens={{ childrenGap: 20 }}
			horizontalAlign="center"
		>
			<Icon
				iconName="LightningBolt"
				className={styles.icon}
				styles={{ root: { color: theme.palette.themePrimary } }}
			/>
			<Stack tokens={{ childrenGap: 10 }} styles={{ root: { textAlign: "center" } }}>
				<Text variant="xxLarge" className={styles.title}>
					Welcome to the Quiz App
				</Text>
				<Text variant="medium" className={styles.description}>
					Test your knowledge with our exciting quiz based on time! Answer the questions and see how well you
					perform.
				</Text>
				<Text variant="medium" className={styles.description}>
					This quiz covers various time related questions, so get ready to challenge yourself and have fun!
				</Text>
			</Stack>
			<PrimaryButton
				className={styles.startButton}
				onClick={() => quizAppSubmissionStore.setCurrentPage(quizAppSubmissionStore.currentPage + 1)}
			>
				Proceed
			</PrimaryButton>
		</Stack>
	);
};
