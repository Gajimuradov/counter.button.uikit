// components/Counter/Counter.tsx
import { CSSProperties, useMemo } from "react";
import "./Counter.styl";

interface CounterProps {
	value: number | string;
	size?: 8 | 12 | 16 | 20 | 24;
	variant?: "primary" | "secondary";
	stroke?: boolean;
	pulse?: boolean;
	className?: string;
}

const SIZE_CONFIG = {
	8: { padding: 0, minSize: 8, strokeWidth: 1 },
	12: { padding: 0, minSize: 12, strokeWidth: 2 },
	16: { padding: 4, minSize: 16, strokeWidth: 2 },
	20: { padding: 4, minSize: 20, strokeWidth: 2 },
	24: { padding: 6, minSize: 24, strokeWidth: 3 },
};

export const Counter = ({
	value,
	size = 24,
	variant = "primary",
	stroke = false,
	pulse = false,
	className = "",
}: CounterProps) => {
	const formattedValue = useMemo(() => {
		if (value === undefined || value === null) {
			return "";
		}
		if (typeof value === "number" || !isNaN(Number(value))) {
			const numericValue = Number(value);
			return numericValue > 99 ? "99+" : numericValue.toString();
		}
		if (typeof value === "string") {
			return value.slice(0, 3);
		}
		return "";
	}, [value]);

	const showText = size >= 16;
	const showPulse = pulse && (size === 8 || size === 12);

	const styles: CSSProperties = {
		width: showText ? "auto" : SIZE_CONFIG[size].minSize,
		minWidth: SIZE_CONFIG[size].minSize,
		height: SIZE_CONFIG[size].minSize,
		padding: `0 ${SIZE_CONFIG[size].padding}px`,
		border: stroke
			? `${SIZE_CONFIG[size].strokeWidth}px solid var(--dynamic-surface-base-secondary)`
			: "none",
	};

	return (
		<div
			className={`counter ${variant} ${className} ${showPulse ? "pulse" : ""}`}
			style={styles}>
			{showText && <span className='counter-value'>{formattedValue}</span>}

			{showPulse && (
				<div className='pulse-container'>
					<div className='pulse-dot'></div>
					<div className='pulse-wave one'></div>
					<div className='pulse-wave two'></div>
				</div>
			)}
		</div>
	);
};
