import create from "zustand";

export enum Route {
	Question1 = "Question1",
	Question2 = "Question2",
	Question3 = "Question3",
	Question4 = "Question4",
	Question5 = "Question5",
	Question6 = "Question6",
	Question7 = "Question7",
	Question8 = "Question8",
}

interface INavigationState {
	currentQuestion: Route;
	selectedId?: number;
	navigate: (view: Route, selectedId?: number) => void;
}

export const useNavigationStore = create<INavigationState>((set) => ({
	currentQuestion: Route.Question1,
	selectedId: undefined,
	navigate: (view, id) => set((state) => ({ ...state, currentQuestion: view, selectedId: id })),
}));
