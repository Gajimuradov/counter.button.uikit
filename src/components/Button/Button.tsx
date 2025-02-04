import React, { FC, MouseEvent } from "react";
import classNames from "classnames";
import "./Button.styl";
import { Counter } from "../Counter/Counter";
import loaderSvg from "../../assets/tube-spinner.svg";

// Типы, если нужно больше вариантов — расширяйте
type ButtonStyle = "primary" | "secondary";
type ButtonSize = 28 | 36 | 56;
type ButtonState = "enabled" | "disabled" | "loading";

interface CounterPropsInButton {
	value: number | string;
	size?: 8 | 12 | 16 | 20 | 24;
	variant?: "primary" | "secondary";
	stroke?: boolean;
	pulse?: boolean;
	className?: string;
}

interface ButtonProps {
	/** Текст кнопки */
	label: string;
	/** Стиль (primary/secondary) */
	style?: ButtonStyle;
	/** Размер (28, 36, 56) */
	size?: ButtonSize;
	/** Состояние (enabled/disabled/loading) */
	state?: ButtonState;
	/** Обработчик клика */
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Показывать ли обводку фокуса */
	focused?: boolean;

	counter?: CounterPropsInButton;
}

const SIZE_TOKENS = {
	28: { paddingX: 10, paddingY: 6, fontSize: 13 },
	36: { paddingX: 12, paddingY: 8, fontSize: 14 },
	56: { paddingX: 16, paddingY: 16, fontSize: 16 },
} as const;

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

	const { paddingX, paddingY, fontSize } = SIZE_TOKENS[size];

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (!isDisabled && !isLoading && onClick) {
			onClick(e);
		}
	};

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
			)}
			style={{
				padding: `${paddingY}px ${paddingX}px`,
				fontSize: fontSize,
			}}>
			{/* Если loading, показываем иконку, иначе текст */}
			{isLoading ? (
				<img
					className='Button__loader'
					src={loaderSvg}
					alt='Loading...'
					width='20'
					height='20'
				/>
			) : (
				<span
					className='Button__label'
					title={label}>
					{label}
				</span>
			)}

			{/* Рендерим счётчик, если передан */}
			{counter && (
				<Counter
					value={counter.value}
					size={counter.size}
					variant={counter.variant}
					stroke={counter.stroke}
					pulse={counter.pulse}
					className={classNames("Button__counter", counter.className)}
				/>
			)}
		</button>
	);
};
