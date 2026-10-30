// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=155-30
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaginationArrow } from './PaginationArrow';

const meta = {
  title: 'Components/Pagination Arrow',
  component: PaginationArrow,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PaginationArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PreviousDefault: Story = { args: { Direction: 'Previous', State: 'Default' } };
export const PreviousHover: Story = { args: { Direction: 'Previous', State: 'Hover' } };
export const PreviousDisabled: Story = { args: { Direction: 'Previous', State: 'Disabled' } };
export const NextDefault: Story = { args: { Direction: 'Next', State: 'Default' } };
export const NextHover: Story = { args: { Direction: 'Next', State: 'Hover' } };
export const NextDisabled: Story = { args: { Direction: 'Next', State: 'Disabled' } };

// Example: the pair as Pagination uses it, not a matrix row.
export const ExamplePreviousAndNext: Story = {
  name: 'Example: previous and next',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-element)' }}>
      <PaginationArrow Direction="Previous" State="Disabled" />
      <PaginationArrow Direction="Next" />
    </div>
  ),
};
