// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=147-183
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from '../StatCard/StatCard';
import { LinkButton } from './LinkButton';

const meta = {
  title: 'Components/Link Button',
  component: LinkButton,
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { State: 'Default' } };
export const Hover: Story = { args: { State: 'Hover' } };
export const Disabled: Story = { args: { State: 'Disabled' } };

// Examples: Figma usage notes on cards and on Icon Right, not matrix rows.
export const ExampleInACard: Story = {
  name: 'Example: a secondary action in a card',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-element)' }}>
      <StatCard Label="Open reports" Value="128" Delta="+12 since yesterday" />
      <LinkButton Label="View details" {...{ 'Icon Right': true }} />
    </div>
  ),
};

export const ExampleOpensAnotherPage: Story = {
  name: 'Example: opens another page',
  args: { Label: 'View', 'Icon Right': true },
};
