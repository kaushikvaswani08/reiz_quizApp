export const genders = [
	{ key: "Male", text: "Male" },
	{ key: "Female", text: "Female" },
	{ key: "Other", text: "Other" },
];

export const yesOrNoOptions = [
	{ key: "Yes", text: "Yes" },
	{ key: "No", text: "No" },
];

export const instructionSection = [
	"Carefully read each question and guess the correct answer.",
	"Earn points for each correct answer, aiming for a high score.",
	"If needed, use the revist feature if you are not confident about your answer",
	"Navigate through questions using 'Save & Next' and 'Previous' buttons.",
	"Make sure to click the 'Save & Next' button before navigating to any other question, or else you will lose your answer",
	"Review and edit your answers before clicking 'Submit.'",
	"Make sure you stay on time as you will only have 10 minutes to answer 8 questions",
	"Begin your quiz journey now and test your knowledge",
];

export const questions = [
	{
		questionId: "Question1",
		question: "What day of the week will be 2021-03-14 ?",
		questionType: "text",
		requestURL: "https://timeapi.io/api/Conversion/DayOfTheWeek/2021-03-14",
		requestType: "get",
		responseProperty: "dayOfWeek",
		requestBody: {},
	},
	{
		questionId: "Question2",
		question: "What day of the year will be 2021-06-11 ?",
		questionType: "choice",
		requestURL: "https://timeapi.io/api/Conversion/DayOfTheYear/2021-06-11",
		requestType: "get",
		responseProperty: "day",
		requestBody: {},
		options: [
			{ key: "21", text: "21" },
			{ key: "162", text: "162" },
			{ key: "56", text: "56" },
			{ key: "98", text: "98" },
		],
	},
	{
		questionId: "Question3",
		question:
			"What will be the date if you increment the current datetime with 16:03:45:17(Days : Hours : Minutes : Seconds) ?",
		questionType: "dropdown",
		requestURL: "https://timeapi.io/api/Calculation/current/increment",
		requestType: "post",
		responseProperty: "dateTime",
		requestBody: {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			timeSpan: "16:03:45:17",
		},
		options: [
			{ key: "2024-03-28T18:00:20.59", text: "2024-03-28 18:00:20.59" },
			{ key: "2024-03-28T12:00:20.19", text: "2024-03-28 12:00:20.19" },
			{ key: "2024-03-28T15:00:24.51", text: "2024-03-28 15:00:24.51" },
			{ key: "2024-03-28T21:00:20.59", text: "2024-03-28 21:00:20.59" },
		],
	},
	{
		questionId: "Question4",
		question:
			"What will be the date if you decrement the current datetime with 12:05:26:53(Days : Hours : Minutes : Seconds) ?",
		questionType: "dropdown",
		requestURL: "https://timeapi.io/api/Calculation/current/decrement",
		requestType: "post",
		responseProperty: "dateTime",
		requestBody: {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			timeSpan: "12:05:26:53",
		},
		options: [
			{ key: "2024-03-28T18:00:20.59", text: "2024-03-28 18:00:20.59" },
			{ key: "2024-03-28T12:00:20.19", text: "2024-03-28 12:00:20.19" },
			{ key: "2024-03-28T15:00:24.51", text: "2024-03-28 15:00:24.51" },
			{ key: "2024-03-28T21:00:20.59", text: "2024-03-28 21:00:20.59" },
		],
	},
	{
		questionId: "Question5",
		question: "What day of the week will be 2022-05-27 ?",
		questionType: "choice",
		requestURL: "https://timeapi.io/api/Conversion/DayOfTheWeek/2022-05-27",
		requestType: "get",
		responseProperty: "dayOfWeek",
		requestBody: {},
		options: [
			{ key: "21", text: "21" },
			{ key: "162", text: "162" },
			{ key: "56", text: "56" },
			{ key: "98", text: "98" },
		],
	},
	{
		questionId: "Question6",
		question: "What day of the year will be 2023-09-29 ?",
		questionType: "text",
		requestURL: "https://timeapi.io/api/Conversion/DayOfTheWeek/2023-09-29",
		requestType: "get",
		responseProperty: "day",
		requestBody: {},
	},
	{
		questionId: "Question7",
		question:
			"Which all from the options will be true if you increment the 2021-11-27 05:45:00 datetime with 16:03:45:17(Days : Hours : Minutes : Seconds) ?",
		questionType: "multidropdown",
		requestURL: "https://timeapi.io/api/Calculation/custom/increment",
		requestType: "post",
		responseProperty: "dateTime",
		requestBody: {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			dateTime: "2021-11-27 05:45:00",
			timeSpan: "16:03:45:17",
			dstAmbiguity: "",
		},
		options: [
			{ key: "2024-03-28T18:00:20.59", text: "2024-03-28 18:00:20.59" },
			{ key: "2024-03-28T12:00:20.19", text: "2024-03-28 12:00:20.19" },
			{ key: "2024-03-28T15:00:24.51", text: "2024-03-28 15:00:24.51" },
			{ key: "2024-03-28T21:00:20.59", text: "2024-03-28 21:00:20.59" },
		],
	},
	{
		questionId: "Question8",
		question:
			"Which all from the options will be true if you decrement the 2021-12-21 04:25:10 datetime with 12:05:26:53(Days : Hours : Minutes : Seconds) ?",
		questionType: "multidropdown",
		requestURL: "https://timeapi.io/api/Calculation/custom/decrement",
		requestType: "post",
		responseProperty: "dateTime",
		requestBody: {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			dateTime: "2021-12-21 04:25:10",
			timeSpan: "12:05:26:53",
			dstAmbiguity: "",
		},
		options: [
			{ key: "2024-03-28T18:00:20.59", text: "2024-03-28 18:00:20.59" },
			{ key: "2024-03-28T12:00:20.19", text: "2024-03-28 12:00:20.19" },
			{ key: "2024-03-28T15:00:24.51", text: "2024-03-28 15:00:24.51" },
			{ key: "2024-03-28T21:00:20.59", text: "2024-03-28 21:00:20.59" },
		],
	},
];
