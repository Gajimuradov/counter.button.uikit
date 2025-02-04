import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	argTypes: {
		label: { control: "text" },
		style: {
			control: { type: "radio" },
			options: ["primary", "secondary"],
		},
		size: {
			control: { type: "radio" },
			options: [28, 36, 56],
		},
		state: {
			control: { type: "radio" },
			options: ["enabled", "disabled", "loading"],
		},
		focused: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		label: "Primary Button",
		style: "primary",
		size: 36,
		state: "enabled",
		focused: false,
	},
};

export const Secondary: Story = {
	args: {
		label: "Secondary Button",
		style: "secondary",
		size: 36,
		state: "enabled",
		focused: false,
	},
};

export const Disabled: Story = {
	args: {
		label: "Disabled Button",
		style: "primary",
		size: 36,
		state: "disabled",
	},
};

export const Loading: Story = {
	args: {
		label: "Loading Button",
		style: "primary",
		size: 36,
		state: "loading",
	},
};

export const Focused: Story = {
	args: {
		label: "Focused Button",
		style: "primary",
		size: 36,
		state: "enabled",
		focused: true,
	},
};
