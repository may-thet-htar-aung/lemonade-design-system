// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=105-26
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterChip } from '../FilterChip/FilterChip';
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

// Example: Figma usage note "Pair it with Filter Chips below it", not a matrix row.
export const ExampleWithFilterChips: Story = {
  name: 'Example: with filter chips',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-component)' }}>
      <SearchField />
      <div style={{ display: 'flex', gap: 'var(--gap-component)' }}>
        <FilterChip Label="All" State="Active" />
        <FilterChip Label="Wallets" />
        <FilterChip Label="Phones" />
      </div>
    </div>
  ),
};
