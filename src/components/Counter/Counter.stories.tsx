//counter.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Counter } from "./Counter.tsx";

const meta: Meta<typeof Counter> = {
	title: "Components/Counter",
	component: Counter,
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: { type: "text" },
			description: "Число или строка (макс. 3 символа)",
		},
		size: {
			control: { type: "select" },
			options: [8, 12, 16, 20, 24],
			description: "Размер компонента",
		},
		variant: {
			control: { type: "radio" },
			options: ["primary", "secondary"],
			description: "Цветовая схема",
		},
		pulse: {
			control: "boolean",
			description: "Анимация пульсации (только для size 8/12)",
		},
		stroke: {
			control: "boolean",
			description: "Обводка компонента",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Counter>;

// Базовая история
export const Default: Story = {
	args: {
		value: 42,
		size: 24,
		variant: "primary",
		stroke: true,
	},
};

// История с обрезанным значением
export const OverflowValue: Story = {
	args: {
		value: 150, // Должно отображаться "99+"
		size: 20,
		variant: "secondary",
	},
};

// Пульсация для primary
export const PrimaryWithPulse: Story = {
	args: {
		...Default.args,
		value: 3,
		size: 8,
		pulse: true,
		stroke: false,
	},
};

// Пульсация для secondary
export const SecondaryWithPulse: Story = {
	args: {
		value: "new",
		size: 12,
		variant: "secondary",
		pulse: true,
	},
};
