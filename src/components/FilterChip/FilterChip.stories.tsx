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

// Examples: Figma usage notes (Filter Chip page), not matrix rows.
const row = { display: 'flex', gap: 'var(--gap-component)' };

export const ExampleFilterAList: Story = {
  name: 'Example: filter a list',
  render: () => (
    <div style={row}>
      <FilterChip Label="All" State="Active" />
      <FilterChip Label="Wallets" />
      <FilterChip Label="Phones" />
      <FilterChip Label="Keys" />
    </div>
  ),
};

export const ExampleReportType: Story = {
  name: 'Example: switch report type',
  render: () => (
    <div style={row}>
      <FilterChip Label="Lost" State="Active" />
      <FilterChip Label="Found" />
    </div>
  ),
};
