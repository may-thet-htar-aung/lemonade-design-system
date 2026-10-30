// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=111-16
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta = {
  title: 'Components/Stat Card',
  component: StatCard,
  args: {
    Label: 'Open reports',
    Value: '128',
    Delta: '+12 since yesterday',
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShowDeltaOn: Story = { args: { 'Show delta': true } };
export const ShowDeltaOff: Story = { args: { 'Show delta': false } };

// Example: Figma usage note "Put three or four cards in a row with the same width", not a matrix row.
export const ExampleDashboardRow: Story = {
  name: 'Example: a dashboard row',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-component)' }}>
      <StatCard Label="Open reports" Value="128" Delta="+12 since yesterday" />
      <StatCard Label="Potential matches" Value="34" Delta="+5 since yesterday" />
      <StatCard Label="Returned items" Value="56" {...{ 'Show delta': false }} />
    </div>
  ),
};
