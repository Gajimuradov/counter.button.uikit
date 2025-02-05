import React, { FC, MouseEvent } from "react";
import classNames from "classnames";
import "./Button.styl";
import { Counter } from "../Counter/Counter";
import loaderSvg from "../../assets/tube-spinner.svg";

type ButtonStyle = "primary" | "secondary";
type ButtonSize = 28 | 36 | 56;
type ButtonState = "enabled" | "disabled" | "loading";

interface CounterPropsInButton {
	value?: number | string;
	size?: 8 | 12 | 16 | 20 | 24;
	variant?: "primary" | "secondary";
	stroke?: boolean;
	pulse?: boolean;
	className?: string;
}

interface ButtonProps {
	label: string;
	style?: ButtonStyle;
	size?: ButtonSize;
	state?: ButtonState;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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

	// Извлекаем отступы и fontSize из SIZE_TOKENS
	const { paddingX, paddingY, fontSize } = SIZE_TOKENS[size];

	// Клик
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (!isDisabled && !isLoading && onClick) {
			onClick(e);
		}
	};

	// Чтобы у Counter было хотя бы дефолтное значение
	// (если вдруг в Storybook забыли указать его)
	const counterValue = counter?.value ?? 5;

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
			{/* Контейнер для контента (label+counter).
          При loading делаем opacity=0 (через CSS). */}
			<div className='Button__content'>
				<span
					className='Button__label'
					title={label}>
					{label}
				</span>
				{counter && (
					<Counter
						value={counterValue}
						size={counter.size}
						variant={counter.variant}
						stroke={counter.stroke}
						pulse={counter.pulse}
						className={classNames("Button__counter", counter.className)}
					/>
				)}
			</div>

			{/* При loading показываем Loader, позиционируем в центре */}
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
