// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=109-69
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from './Callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Privacy: Story = { args: { Type: 'Privacy' } };
export const AIMatch: Story = { args: { Type: 'AI Match' } };
