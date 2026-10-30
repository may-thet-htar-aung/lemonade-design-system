// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=66-22
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Components/Status Badge',
  component: StatusBadge,
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lost: Story = { args: { Status: 'Lost' } };
export const Found: Story = { args: { Status: 'Found' } };
export const PotentialMatch: Story = { args: { Status: 'Potential Match' } };
export const ClaimPending: Story = { args: { Status: 'Claim Pending' } };
export const Verified: Story = { args: { Status: 'Verified' } };
export const Returned: Story = { args: { Status: 'Returned' } };
export const Rejected: Story = { args: { Status: 'Rejected' } };

// Example: Figma usage note "Put it next to the item name", not a matrix row.
export const ExampleNextToItemName: Story = {
  name: 'Example: next to an item name',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-component)' }}>
      <span>Black wallet</span>
      <StatusBadge Status="Found" />
    </div>
  ),
};
