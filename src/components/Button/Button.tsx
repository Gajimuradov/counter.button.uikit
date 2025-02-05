import React, { FC, MouseEvent } from "react";
import classNames from "classnames";
import "./Button.styl";
import { Counter } from "../Counter/Counter";
import loaderSvg from "../../assets/tube-spinner.svg";

type ButtonStyle = "primary" | "secondary";
type ButtonSize = 28 | 36 | 56;
type ButtonState = "enabled" | "disabled" | "loading";

interface ButtonCounterProps {
	value?: number | string;
}

interface ButtonProps {
	label: string;
	style?: ButtonStyle;
	size?: ButtonSize;
	state?: ButtonState;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	focused?: boolean;
	/**
	 * Если нужно отобразить счётчик, передаём объект { value? }.
	 * Если undefined/null — не рендерим счётчик.
	 */
	counter?: ButtonCounterProps;
}

export const Button: FC<ButtonProps> = ({
	label,
	style = "primary",
	size = 36,
	state = "enabled",
	onClick,
	focused = false,
	counter,
}) => {
	const isDisabled = state === "disabled";
	const isLoading = state === "loading";

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (!isDisabled && !isLoading && onClick) {
			onClick(e);
		}
	};

	// Если есть counter, используем value (или 5 по умолчанию),
	// остальные поля Counter не нужны (только value).
	const counterValue = counter ? counter.value ?? 5 : undefined;

	return (
		<button
			type='button'
			disabled={isDisabled}
			onClick={handleClick}
			className={classNames(
				"Button",
				`Button--${style}`,
				`Button--size-${size}`,
				`Button--${state}`,
				{ "Button--focused": focused },
			)}>
			{/* Контент (Label + Counter). При loading → opacity=0 */}
			<div className='Button__content'>
				<span
					className='Button__label'
					title={label}>
					{label}
				</span>

				{counter && (
					<Counter
						value={counterValue}
						className='Button__counter'
					/>
				)}
			</div>

			{/* Loader в центре, если loading */}
			{isLoading && (
				<img
					className='Button__loader'
					src={loaderSvg}
					alt='Loading...'
					width='20'
					height='20'
				/>
			)}
		</button>
	);
};
