/*eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";
import { IUserFormData } from "../components/UserInfo/IUserInfoProps";
import { IQuizResults } from "../components/QuizScreen/IQuizScreenProps";

export interface IUserResponse {
	questionId: string;
	question: string;
	correctAnswer?: string | number | Date;
	userAnswer: any;
	answeredCorrectly?: boolean;
}

interface IQuizAppStore {
	currentPage: number;
	userInfoListId: string;
	userInformation: IUserFormData;
	userAnsweredQuizData: IUserResponse[];
	loading: {
		loadingUserInfo: boolean;
		savingUserInfo: boolean;
		submittingQuizResponses: boolean;
		fetchingQuizResults: boolean;
	};
	quizResultsListId: string;
	quizResults: IQuizResults;

	setCurrentPage: (pageNo: number) => void;
	setUserInfoListId: (listId: string) => void;
	setUserInformation: (itemData: IUserFormData) => void;
	setUserAnsweredQuizData: (data: IUserResponse[]) => void;
	setLoading: (loading: {
		loadingUserInfo: boolean;
		savingUserInfo: boolean;
		submittingQuizResponses: boolean;
		fetchingQuizResults: boolean;
	}) => void;
	setQuizResultsListId: (listId: string) => void;
	setQuizResults: (data: IQuizResults) => void;
}

export const useQuizAppStore = create<IQuizAppStore>((set) => ({
	currentPage: 1,
	userInfoListId: "",
	userInformation: {
		ID: 0,
		FirstName: "",
		LastName: "",
		Email: "",
		PhoneNumber: "",
		Country: "",
		City: "",
		State: "",
		PostalCode: "",
		DateOfBirth: new Date(),
		Gender: "",
		AboutYou: "",
	},
	userAnsweredQuizData: [],
	loading: {
		loadingUserInfo: false,
		savingUserInfo: false,
		submittingQuizResponses: false,
		fetchingQuizResults: false,
	},
	quizResultsListId: "",
	quizResults: {
		UserEmail: "",
		QuizJson: "",
		CorrectAnswers: 0,
		WrongAnswers: 0,
		TotalScore: 0,
	},

	setCurrentPage: (pageNo: number) => set((state) => ({ ...state, currentPage: pageNo })),
	setUserInfoListId: (listId: string) => set((state) => ({ ...state, userInfoListId: listId })),
	setUserInformation: (itemData: IUserFormData) => set((state) => ({ ...state, userInformation: itemData })),
	setUserAnsweredQuizData: (data: IUserResponse[]) => set((state) => ({ ...state, userAnsweredQuizData: data })),
	setLoading: (loading: {
		loadingUserInfo: boolean;
		savingUserInfo: boolean;
		submittingQuizResponses: boolean;
		fetchingQuizResults: boolean;
	}) => set((state) => ({ ...state, loading: loading })),
	setQuizResultsListId: (listId: string) => set((state) => ({ ...state, quizResultsListId: listId })),
	setQuizResults: (data: IQuizResults) => set((state) => ({ ...state, quizResults: data })),
}));
