/*eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { IQuizResults, IQuizScreenProps } from "./IQuizScreenProps";
import { RouteArray, Sidebar } from "../Sidebar/Sidebar";
import { Route, useNavigationStore } from "../../Stores/NavigationStore";
import {
	useTheme,
	mergeStyleSets,
	Stack,
	Text,
	Icon,
	PrimaryButton,
	DefaultButton,
	TextField,
	IDropdownOption,
	ChoiceGroup,
	Dropdown,
	MessageBar,
	MessageBarType,
	Label,
	Spinner,
	SpinnerSize,
} from "@fluentui/react";
import styles from "./QuizScreen.module.scss";
import { IUserResponse, useQuizAppStore } from "../../Stores/QuizAppStore";
import { questions } from "../Constants/Constants";
import { SharepointQuizService } from "../../Services/SharepointQuizService";

export const QuizScreen: React.FC<IQuizScreenProps> = (props: IQuizScreenProps): JSX.Element => {
	const QuizServiceInstance = SharepointQuizService.getInstance();
	const navigationStore = useNavigationStore((state) => state);
	const quizAppSubmissionStore = useQuizAppStore((state) => state);
	const theme = useTheme();
	const classes = mergeStyleSets({
		root: {
			borderRadius: 16,
			backgroundColor: theme.palette.neutralLighter,
			minHeight: 400,
			padding: 32,
		},
	});

	const [timer, setTimer] = React.useState<number>(600);
	const [userResponses, setUserResponses] = React.useState<IUserResponse[]>([
		...quizAppSubmissionStore.userAnsweredQuizData,
	]);

	const handleTextChange = (questionId: string, value: string): void => {
		setUserResponses((prevResponses) => [
			...prevResponses.filter((response) => response.questionId !== questionId),
			{
				questionId,
				question: questions.find((q) => q.questionId === questionId)?.question || "",
				userAnswer: value,
			},
		]);
	};

	const handleChoiceChange = (questionId: string, value: string): void => {
		setUserResponses((prevResponses) => [
			...prevResponses.filter((response) => response.questionId !== questionId),
			{
				questionId,
				question: questions.find((q) => q.questionId === questionId)?.question || "",
				userAnswer: value,
			},
		]);
	};

	const handleDropdownChange = (questionId: string, option: IDropdownOption | undefined): void => {
		setUserResponses((prevResponses) => [
			...prevResponses.filter((response) => response.questionId !== questionId),
			{
				questionId,
				question: questions.find((q) => q.questionId === questionId)?.question || "",
				userAnswer: option?.text || null,
			},
		]);
	};

	const handleMultiDropdownChange = (questionId: string, option: IDropdownOption | undefined): void => {
		if (option?.selected) {
			const userAnswers = userResponses.find((response) => response.questionId === questionId)?.userAnswer;
			setUserResponses((prevResponses) => [
				...prevResponses.filter((response) => response.questionId !== questionId),
				{
					questionId,
					question: questions.find((q) => q.questionId === questionId)?.question || "",
					userAnswer: [...(userAnswers || []), option.text],
				},
			]);
		} else {
			const userAnswers = userResponses.find((response) => response.questionId === questionId)?.userAnswer;
			if (userAnswers.indexOf(option?.text) > -1) {
				userAnswers.splice(userAnswers.indexOf(option?.text), 1);
				setUserResponses((prevResponses) => [
					...prevResponses.filter((response) => response.questionId !== questionId),
					{
						questionId,
						question: questions.find((q) => q.questionId === questionId)?.question || "",
						userAnswer: [...(userAnswers || [])],
					},
				]);
			}
		}
	};

	const renderQuestionComponent = (
		questionId: string,
		question: string,
		questionType: string,
		value: any,
		options: { key: string; text: string }[]
	): JSX.Element | null => {
		switch (questionType) {
			case "text":
				return (
					<TextField
						placeholder="yyyy-MM-dd"
						className={styles.answerFields}
						value={value}
						onChange={(e, value) => handleTextChange(questionId, value || "")}
					/>
				);
			case "choice":
				return (
					<ChoiceGroup
						options={options}
						className={styles.answerFields}
						selectedKey={value}
						onChange={(e, option) => handleChoiceChange(questionId, option?.key || "")}
					/>
				);
			case "dropdown":
				return (
					<Dropdown
						options={options}
						placeholder="Select an option"
						className={styles.answerFields}
						selectedKey={value ? value.split(" ").join("T") : undefined}
						onChange={(e, option) => handleDropdownChange(questionId, option)}
					/>
				);
			case "multidropdown":
				return (
					<Dropdown
						options={options}
						placeholder="Select one/more options"
						className={styles.answerFields}
						selectedKeys={value && value.length ? value.map((e: any) => e.split(" ").join("T")) : []}
						onChange={(e, option) => handleMultiDropdownChange(questionId, option)}
						multiSelect
					/>
				);
			default:
				return null;
		}
	};

	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
		const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

		return `${formattedMinutes}:${formattedSeconds}`;
	};

	const onSubmitClick = async (): Promise<void> => {
		quizAppSubmissionStore.setLoading({ ...quizAppSubmissionStore.loading, submittingQuizResponses: true });
		quizAppSubmissionStore.setUserAnsweredQuizData(userResponses);
		const data: IQuizResults = {
			UserEmail: quizAppSubmissionStore.userInformation.Email,
			QuizJson: JSON.stringify(userResponses),
			CorrectAnswers: 6,
			WrongAnswers: 2,
			TotalScore: 60,
		};
		await QuizServiceInstance.createListItems(quizAppSubmissionStore.quizResultsListId, data);
		quizAppSubmissionStore.setQuizResults(data);
		quizAppSubmissionStore.setCurrentPage(quizAppSubmissionStore.currentPage + 1)
		quizAppSubmissionStore.setLoading({ ...quizAppSubmissionStore.loading, submittingQuizResponses: false })
	};

	React.useEffect(() => {
		let quizTimer: number;
		if (timer > 0) {
			quizTimer = setInterval(() => {
				setTimer((prevTime) => prevTime - 1);
			}, 1000);
		} else {
			onSubmitClick();
		}

		return () => {
			clearInterval(quizTimer);
		};
	}, [timer]);

	const onNextClick = async (): Promise<void> => {
		quizAppSubmissionStore.setUserAnsweredQuizData(userResponses);
		const currentQuestionIndex = RouteArray.indexOf(navigationStore.currentQuestion);
		navigationStore.navigate(RouteArray[currentQuestionIndex + 1] as Route, undefined);
	};

	const onPreviousClick = (): void => {
		const currentQuestionIndex = RouteArray.indexOf(navigationStore.currentQuestion);
		navigationStore.navigate(RouteArray[currentQuestionIndex - 1] as Route, undefined);
	};

	return (
		<Stack tokens={{ childrenGap: 20 }} className={classes.root}>
			<div className={styles.quizTitleContainer} style={{ backgroundColor: theme.palette.themePrimary }}>
				<Text variant="xLarge" className={styles.quizTitle}>
					{`Quiz Time ${quizAppSubmissionStore.userInformation.FirstName}`}
				</Text>
				<div style={{ display: "flex" }}>
					<div>
						<Icon
							iconName="Timer"
							title="Timer"
							styles={{
								root: {
									fontSize: 25,
									color: "white",
									marginRight: 10,
								},
							}}
						/>
					</div>
					<Text variant="xLarge" className={styles.quizTitle}>
						{formatTime(timer)}
					</Text>
				</div>
			</div>

			{quizAppSubmissionStore.loading.submittingQuizResponses && (
				<Stack
					styles={{
						root: {
							textAlign: "center",
							justifyContent: "center",
							position: "absolute",
							left: "43%",
							top: "50%",
							zIndex: 111,
						},
					}}
					tokens={{ childrenGap: 15 }}
				>
					<Label>Submitting your responses. Please wait</Label>
					<Spinner
						size={SpinnerSize.large}
						styles={{
							circle: {
								width: 45,
								height: 45,
								borderWidth: 3,
							},
						}}
					/>
				</Stack>
			)}
			<Stack
				horizontal
				tokens={{ childrenGap: 20 }}
				styles={{ root: { opacity: quizAppSubmissionStore.loading.submittingQuizResponses ? 0.3 : 1 } }}
			>
				<Sidebar currentQuestion={navigationStore.currentQuestion} />
				<Stack tokens={{ childrenGap: 15 }} style={{ backgroundColor: "white", width: "85%" }}>
					{timer < 60 && (
						<div>
							<MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
								You have 1 minute left. Quiz will automatically submit once the time is up so make sure
								you save your answers
							</MessageBar>
						</div>
					)}
					<Stack
						style={{
							backgroundColor: "white",
							width: "100%",
							justifyContent: "space-between",
							padding: 30,
							height: "100%",
						}}
					>
						<div>
							{questions.map((e, index) => {
								if (e.questionId === navigationStore.currentQuestion) {
									return (
										<Stack>
											<Stack horizontal tokens={{ childrenGap: 5 }}>
												<Text variant="large" style={{ fontWeight: 600 }}>
													{`${index + 1}.`}
												</Text>
												<Text variant="large" style={{ fontWeight: 600 }}>
													{`${e.question}`}
												</Text>
											</Stack>
											<div style={{ marginLeft: 5, marginTop: 20 }}>
												{renderQuestionComponent(
													e.questionId,
													e.question,
													e.questionType,
													userResponses.find((res) => res.questionId === e.questionId)
														?.userAnswer,
													e.options || []
												)}
											</div>
										</Stack>
									);
								}
							})}
						</div>
						<Stack
							horizontal
							tokens={{ childrenGap: 15 }}
							className={styles.formActions}
							style={{
								justifyContent:
									navigationStore.currentQuestion !== "Question1" ? "space-between" : "flex-end",
							}}
						>
							{navigationStore.currentQuestion !== "Question1" && (
								<DefaultButton
									disabled={quizAppSubmissionStore.loading.submittingQuizResponses}
									text={"Previous"}
									onClick={onPreviousClick}
								/>
							)}
							{navigationStore.currentQuestion === "Question8" ? (
								<PrimaryButton
									disabled={quizAppSubmissionStore.loading.submittingQuizResponses}
									text={"Submit"}
									onClick={onSubmitClick}
								/>
							) : (
								<PrimaryButton text={"Save & Next"} onClick={onNextClick} />
							)}
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};
