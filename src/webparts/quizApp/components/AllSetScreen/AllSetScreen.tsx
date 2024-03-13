import * as React from "react";
import { Stack, Text, PrimaryButton, Icon, useTheme, mergeStyleSets } from "@fluentui/react";
import { useQuizAppStore } from "../../Stores/QuizAppStore";
import styles from "./AllSetScreen.module.scss";
import { IAllSetScreenProps } from "./IAllSetScreenProps";
import { instructionSection } from "../Constants/Constants";

export const AllSetScreen: React.FC<IAllSetScreenProps> = (props: IAllSetScreenProps): JSX.Element => {
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
					You are all set
				</Text>
				<Text variant="medium" className={styles.description}>
					Get started by clicking the Start Quiz button
				</Text>
				<ul style={{ textAlign: "left" }}>
					{instructionSection.map((section, index) => (
						<li key={index}>
							<Text variant="medium" className={styles.description}>
								{section}
							</Text>
						</li>
					))}
				</ul>
			</Stack>
			<PrimaryButton
				className={styles.startButton}
				onClick={() => quizAppSubmissionStore.setCurrentPage(quizAppSubmissionStore.currentPage + 1)}
			>
				Start Quiz
			</PrimaryButton>
		</Stack>
	);
};
