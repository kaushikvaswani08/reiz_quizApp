import * as React from "react";
import {
	Text,
	Stack,
	TextField,
	PrimaryButton,
	DatePicker,
	Dropdown,
	IDropdownOption,
	useTheme,
	mergeStyleSets,
	IconButton,
	Label,
	Spinner,
	SpinnerSize,
} from "@fluentui/react";
import { IUserFormData, IUserInfoProps } from "./IUserInfoProps";
import { useFormik } from "formik";
import styles from "./UserInfo.module.scss";
import { genders, yesOrNoOptions } from "../Constants/Constants";
import { SharepointQuizService } from "../../Services/SharepointQuizService";
import { useQuizAppStore } from "../../Stores/QuizAppStore";

export const UserInfo: React.FC<IUserInfoProps> = (props: IUserInfoProps): JSX.Element => {
	const QuizServiceInstance = SharepointQuizService.getInstance();
	const quizAppSubmissionStore = useQuizAppStore((state) => state);
	const [userDetialsFetched, setUserDetailsFetched] = React.useState<boolean>(false);
	const theme = useTheme();
	const classes = mergeStyleSets({
		root: {
			borderRadius: 16,
			backgroundColor: theme.palette.neutralLighter,
			minHeight: 400,
			padding: 32,
		},
	});
	const [userExists, setUserExists] = React.useState<boolean>(false);
	const [enteredEmail, setEnteredEmail] = React.useState<string | undefined>("");
	const [userDoesNotExits, setUserDoesNotExists] = React.useState<boolean>(false);
	const [editMode, setEditMode] = React.useState<boolean>(false);

	const clsx = (...classNames: (string | undefined)[]): string => classNames.filter(Boolean).join(" ");

	const [quizTakenBefore, setQuizTakenBefore] = React.useState<string>("");

	const formik = useFormik<IUserFormData>({
		initialValues: { ...quizAppSubmissionStore.userInformation },
		onSubmit: async (values) => {
			quizAppSubmissionStore.setLoading({ ...quizAppSubmissionStore.loading, savingUserInfo: true });
			if (editMode) {
				const itemData: IUserFormData = {
					ID: values.ID,
					FirstName: values.FirstName,
					LastName: values.LastName,
					PhoneNumber: values.PhoneNumber,
					Email: values.Email,
					Country: values.Country,
					City: values.City,
					State: values.State,
					PostalCode: values.PostalCode,
					DateOfBirth: values.DateOfBirth,
					Gender: values.Gender,
					AboutYou: values.AboutYou,
				};
				await QuizServiceInstance.updateListItems(quizAppSubmissionStore.userInfoListId, values.ID, itemData);
				quizAppSubmissionStore.setUserInformation(itemData);
				formik.resetForm();
			} else if (quizTakenBefore === "Yes") {
				const userData = await QuizServiceInstance.getListItems(
					quizAppSubmissionStore.userInfoListId,
					"*",
					"",
					`Email eq '${formik.values.Email}'`
				);
				if (userData.length) {
					setUserExists(true);
					quizAppSubmissionStore.setUserInformation({ ...userData[0] });
				}
			} else {
				const userData = await QuizServiceInstance.getListItems(
					quizAppSubmissionStore.userInfoListId,
					"*",
					"",
					`Email eq '${formik.values.Email}'`
				);
				if (userData.length) {
					setUserExists(true);
				} else {
					const response = await QuizServiceInstance.createListItems(
						quizAppSubmissionStore.userInfoListId,
						values
					);
					setUserExists(false);
					quizAppSubmissionStore.setUserInformation({ ...values, ID: response.data.ID });
					formik.resetForm();
				}
			}
			quizAppSubmissionStore.setLoading({ ...quizAppSubmissionStore.loading, savingUserInfo: false });
			quizAppSubmissionStore.setCurrentPage(quizAppSubmissionStore.currentPage + 1);
		},
	});

	const handleDateChange = (date?: Date | null): void => {
		formik.setFieldValue("DateOfBirth", date);
	};

	const handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
		formik.setFieldValue("Gender", option?.text);
	};

	const fetchUser = async (): Promise<void> => {
		quizAppSubmissionStore.setLoading({ ...quizAppSubmissionStore.loading, loadingUserInfo: true });
		const userData = await QuizServiceInstance.getListItems(
			quizAppSubmissionStore.userInfoListId,
			"*",
			"",
			`Email eq '${enteredEmail}'`
		);
		if (userData.length) {
			setUserDetailsFetched(true);
			setUserDoesNotExists(false);
			const userDataWithoutDate = {
				...userData[0],
				DateOfBirth: new Date(userData[0].DateOfBirth?.toString() || ""),
			};
			formik.setValues(userDataWithoutDate);
		} else {
			setUserDetailsFetched(false);
			setUserDoesNotExists(true);
		}
		quizAppSubmissionStore.setLoading({ ...quizAppSubmissionStore.loading, loadingUserInfo: false });
	};

	const handleQuizTakenBeforeDropdownChange = (
		e: React.FormEvent<HTMLDivElement>,
		option: IDropdownOption<{ key: string; text: string }> | undefined
	): void => {
		setQuizTakenBefore(option?.text || "");
		formik.resetForm();
		setUserExists(false);
		setEnteredEmail("");
		setUserDetailsFetched(false);
		setUserDoesNotExists(false);
	};

	return (
		<Stack tokens={{ childrenGap: 20 }} className={classes.root}>
			<Text variant="xxLarge" className={styles.title}>
				Let&rsquo;s start wit some Basic Information
			</Text>
			<Dropdown
				styles={{ root: { width: "30%" } }}
				label="Have you been part of this quiz before?"
				selectedKey={quizTakenBefore ? quizTakenBefore : undefined}
				// eslint-disable-next-line react/jsx-no-bind
				onChange={handleQuizTakenBeforeDropdownChange}
				placeholder="Select an option"
				options={yesOrNoOptions}
			/>
			{quizTakenBefore === "Yes" && (
				<Stack horizontal tokens={{ childrenGap: 15 }}>
					<TextField
						id="enteredEmail"
						label="Please enter your email address"
						type="email"
						value={enteredEmail}
						onChange={(e, v) => setEnteredEmail(v)}
						required
						styles={{
							root: {
								width: "30%",
								marginBottom: 10,
							},
						}}
						errorMessage={
							userDoesNotExits ? "Entered email does not exist in our records. Please add the user" : ""
						}
					/>
					<IconButton
						iconProps={{ iconName: "Forward" }}
						title="Proceed"
						ariaLabel="Proceed"
						disabled={!enteredEmail}
						checked={false}
						styles={{
							icon: styles.icon,
						}}
						onClick={fetchUser}
					/>
				</Stack>
			)}
			{quizAppSubmissionStore.loading.loadingUserInfo && (
				<Stack styles={{ root: { textAlign: "center" } }} tokens={{ childrenGap: 15 }}>
					<Label>Loading user information. Please wait</Label>
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
			{(quizTakenBefore === "No" || (quizTakenBefore === "Yes" && userDetialsFetched)) && (
				<form
					className={clsx(styles.userInfoForm, classes.root)}
					style={{ backgroundColor: theme.palette.white }}
					onSubmit={formik.handleSubmit}
				>
					<Stack tokens={{ childrenGap: 20 }}>
						{quizTakenBefore === "Yes" && (
							<Stack tokens={{ childrenGap: 15 }} horizontal>
								<Text variant="large" className={styles.title}>
									Verify your details
								</Text>
								<IconButton
									iconProps={{ iconName: "Edit" }}
									title="Edit"
									ariaLabel="Edit"
									checked={false}
									styles={{
										icon: {
											marginBottom: 10,
										},
									}}
									onClick={() => setEditMode(true)}
								/>
							</Stack>
						)}
						<Stack horizontal tokens={{ childrenGap: 15 }} className={styles.formColumn}>
							<TextField
								className={styles.formFields}
								id="FirstName"
								label="First Name"
								value={formik.values.FirstName}
								onChange={formik.handleChange}
								required
								disabled={!!enteredEmail && !editMode}
							/>
							<TextField
								className={styles.formFields}
								id="LastName"
								label="Last Name"
								value={formik.values.LastName}
								onChange={formik.handleChange}
								required
								disabled={!!enteredEmail && !editMode}
							/>
						</Stack>
						<Stack horizontal tokens={{ childrenGap: 15 }} className={styles.formColumn}>
							<TextField
								className={styles.formFields}
								id="Email"
								label="Email"
								type="email"
								value={formik.values.Email}
								onChange={formik.handleChange}
								required
								disabled={!!enteredEmail}
								errorMessage={userExists ? "User already exits in our records" : ""}
							/>
							<TextField
								className={styles.formFields}
								id="PhoneNumber"
								label="Phone Number"
								value={formik.values.PhoneNumber}
								onChange={formik.handleChange}
								disabled={!!enteredEmail && !editMode}
							/>
						</Stack>
						<Stack horizontal tokens={{ childrenGap: 15 }} className={styles.formColumn}>
							<TextField
								className={styles.formFields}
								id="Country"
								label="Country"
								value={formik.values.Country}
								onChange={formik.handleChange}
								disabled={!!enteredEmail && !editMode}
							/>
							<TextField
								className={styles.formFields}
								id="City"
								label="City"
								value={formik.values.City}
								onChange={formik.handleChange}
								disabled={!!enteredEmail && !editMode}
							/>
						</Stack>
						<Stack horizontal tokens={{ childrenGap: 15 }} className={styles.formColumn}>
							<TextField
								className={styles.formFields}
								id="State"
								label="State"
								value={formik.values.State}
								onChange={formik.handleChange}
								disabled={!!enteredEmail && !editMode}
							/>
							<TextField
								className={styles.formFields}
								id="PostalCode"
								label="Postal Code"
								value={formik.values.PostalCode}
								onChange={formik.handleChange}
								disabled={!!enteredEmail && !editMode}
							/>
						</Stack>
						<Stack horizontal tokens={{ childrenGap: 15 }} className={styles.formColumn}>
							<DatePicker
								className={styles.formFields}
								id="DateOfBirth"
								label="Date of Birth"
								value={formik.values.DateOfBirth}
								onSelectDate={handleDateChange}
								disabled={!!enteredEmail && !editMode}
							/>

							<Dropdown
								className={styles.formFields}
								label="Gender"
								options={genders}
								selectedKey={formik.values.Gender ? formik.values.Gender : undefined}
								onChange={handleDropdownChange}
								disabled={!!enteredEmail && !editMode}
							/>
						</Stack>
						<Stack horizontal tokens={{ childrenGap: 15 }} className={styles.formColumn}>
							<TextField
								className={styles.formFields}
								id="AboutYou"
								label="About You"
								value={formik.values.AboutYou}
								onChange={formik.handleChange}
								multiline
								disabled={!!enteredEmail && !editMode}
							/>
						</Stack>
						{quizAppSubmissionStore.loading.savingUserInfo && (
							<Stack
								styles={{ root: { textAlign: "center", justifyContent: "center" } }}
								tokens={{ childrenGap: 15 }}
							>
								<Label>Saving user information. Please wait</Label>
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
					</Stack>
					<Stack horizontal tokens={{ childrenGap: 15 }} className={styles.formActions}>
						<PrimaryButton
							disabled={quizAppSubmissionStore.loading.savingUserInfo}
							text={editMode ? "Update & Proceed" : "Proceed"}
							type="sumbit"
						/>
					</Stack>
				</form>
			)}
		</Stack>
	);
};
