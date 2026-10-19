// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=73-60
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterChip } from './FilterChip';

const meta = {
  title: 'Components/Filter Chip',
  component: FilterChip,
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { State: 'Default', Label: 'Label' } };
export const Hover: Story = { args: { State: 'Hover', Label: 'Label' } };
export const Active: Story = { args: { State: 'Active', Label: 'Label' } };
export const Disabled: Story = { args: { State: 'Disabled', Label: 'Label' } };
