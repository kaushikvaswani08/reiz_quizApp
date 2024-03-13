export type Intent = "success" | "error" | "warning" | "info" | "none";

export type IterableAction = {
	text: string;
	onClick: () => void;
	type?: "primary" | "default";
	disabled?: boolean;
	loading?: boolean;
};
