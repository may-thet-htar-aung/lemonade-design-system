// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=105-26
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/Search Field',
  component: SearchField,
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { State: 'Default' } };
export const Focused: Story = { args: { State: 'Focused' } };
export const Filled: Story = { args: { State: 'Filled' } };
export const ClearHover: Story = { args: { State: 'Clear Hover' } };
export const Disabled: Story = { args: { State: 'Disabled' } };
