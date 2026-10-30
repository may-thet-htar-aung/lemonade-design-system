// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=141-8
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from '../SearchField/SearchField';
import { Table } from './Table';

/* The node is a single component with no variant properties, so the variant
   matrix has one row: one Header row and five Body rows. */
const meta = {
  title: 'Components/Table',
  component: Table,
  args: { 'aria-label': 'Recent reports' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Example: Search Field's Figma note "at the top of item lists and Back Office tables", not a matrix row.
export const ExampleWithSearch: Story = {
  name: 'Example: with a search field',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-component)' }}>
      <SearchField />
      <Table aria-label="Reports" />
    </div>
  ),
};
