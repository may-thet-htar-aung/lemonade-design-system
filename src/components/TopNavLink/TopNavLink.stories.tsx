// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=173-59
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNavLink } from './TopNavLink';

const meta = {
  title: 'Components/Top Nav Link',
  component: TopNavLink,
} satisfies Meta<typeof TopNavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { State: 'Default' } };
export const Hover: Story = { args: { State: 'Hover' } };
export const Active: Story = { args: { State: 'Active' } };
