import * as React from "react";
import { DefaultButton, PrimaryButton, Spinner, Stack, Text, mergeStyleSets, useTheme } from "@fluentui/react";
import { Intent, IterableAction } from "./Placeholder.types";

export interface PlaceholderProps {
	intent?: Intent;
	heading?: string;
	text?: string;
	actions?: IterableAction[];
	minHeight?: number;
}

/**
 * The Placeholder component elegantly displays icons, titles, descriptions, and buttons, making it a versatile solution for presenting empty states, error messages, warnings, or placeholders in your application.
 */
export const Placeholder = (props: PlaceholderProps): JSX.Element => {
	const theme = useTheme();

	const classes = mergeStyleSets({
		root: {
			borderRadius: 16,
			backgroundColor: theme.palette.neutralLighter,
			minHeight: props.minHeight || 400,
			padding: 32,
		},
		iconContainer: {
			height: 36,
			width: 36,
			borderRadius: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: `rgba(234, 179, 8, 0.16)`,
		},
		icon: {
			height: 24,
			width: 24,
			color: `rgba(234, 179, 8, 1)`,
		},
		successIcon: {
			color: `rgba(34, 197, 94, 1)`,
		},
		successContainer: {
			backgroundColor: `rgba(34, 197, 94, 0.16)`,
		},
		errorIcon: {
			color: `rgba(239, 68, 68, 1)`,
		},
		errorContainer: {
			backgroundColor: `rgba(239, 68, 68, 0.16)`,
		},
		warningIcon: {
			// color: `rgba(234, 179, 8, 1)`,
			color: `rgba(245, 158, 11, 1)`,
		},
		warningContainer: {
			// backgroundColor: `rgba(234, 179, 8, 0.16)`,
			backgroundColor: `rgba(245, 158, 11, 0.16)`,
		},
		infoIcon: {
			color: `rgba(59, 130, 246, 1)`,
		},
		infoContainer: {
			backgroundColor: `rgba(59, 130, 246, 0.16)`,
		},
		reset: {
			padding: 0,
			margin: 0,
		},
	});

	const clsx = (...classNames: (string | undefined)[]): string => classNames.filter(Boolean).join(" ");

	return (
		<Stack className={classes.root} verticalAlign="center" horizontalAlign="center" tokens={{ childrenGap: 24 }}>
			<Stack horizontalAlign="center" tokens={{ childrenGap: 16 }}>
				{props.intent && props.intent === "success" && (
					<div className={clsx(classes.iconContainer, classes.successContainer)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className={clsx(classes.icon, classes.successIcon)}
						>
							<path
								fillRule="evenodd"
								d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}

				{props.intent && props.intent === "error" && (
					<div className={clsx(classes.iconContainer, classes.errorContainer)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className={clsx(classes.icon, classes.errorIcon)}
						>
							<path
								fillRule="evenodd"
								d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}

				{props.intent && props.intent === "warning" && (
					<div className={clsx(classes.iconContainer, classes.warningContainer)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className={clsx(classes.icon, classes.warningIcon)}
						>
							<path
								fillRule="evenodd"
								d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}

				{props.intent && props.intent === "info" && (
					<div className={clsx(classes.iconContainer, classes.infoContainer)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className={clsx(classes.icon, classes.infoIcon)}
						>
							<path
								fillRule="evenodd"
								d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}

				{!props.intent ||
					(props.intent === "none" && (
						<div className={classes.iconContainer}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className={classes.icon}
							>
								<path
									fillRule="evenodd"
									d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					))}

				<Stack tokens={{ childrenGap: 8 }} horizontalAlign="center" style={{ textAlign: "center" }}>
					{props.heading && (
						<Text className={classes.reset} variant="xLarge" as={"h2"}>
							{props.heading}
						</Text>
					)}
					{props.text && <Text className={classes.reset}>{props.text}</Text>}
				</Stack>
			</Stack>

			{props.actions && props.actions.length > 0 && (
				<Stack horizontal tokens={{ childrenGap: 8 }}>
					{props.actions.map((action) => {
						return action.type === "primary" ? (
							<PrimaryButton
								styles={{
									root: {
										marginTop: 20,
									},
								}}
								disabled={action.disabled || action.loading}
								onClick={() => action.onClick()}
							>
								{action.loading ? <Spinner /> : action.text}
							</PrimaryButton>
						) : (
							<DefaultButton
								disabled={action.disabled || action.loading}
								onClick={() => action.onClick()}
							>
								{action.loading ? <Spinner /> : action.text}
							</DefaultButton>
						);
					})}
				</Stack>
			)}
		</Stack>
	);
};
