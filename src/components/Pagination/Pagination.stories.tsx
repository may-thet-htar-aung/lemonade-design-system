// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=151-76
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../Table/Table';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = { args: { Position: 'First' } };
export const Middle: Story = { args: { Position: 'Middle' } };
export const Last: Story = { args: { Position: 'Last' } };

// Example: Figma usage note "Put it directly under a Table, at the same width", not a matrix row.
export const ExampleUnderATable: Story = {
  name: 'Example: under a table',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-component)' }}>
      <Table aria-label="Reports" />
      <Pagination Position="Middle" Summary="Showing 89–96 of 192 reports" />
    </div>
  ),
};
