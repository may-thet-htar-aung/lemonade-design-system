// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=192-33
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/Icon Button',
  component: IconButton,
  parameters: { layout: 'centered' },
  args: { 'aria-label': 'Notifications' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryDefault: Story = { args: { Style: 'Primary', State: 'Default' } };
export const PrimaryHover: Story = { args: { Style: 'Primary', State: 'Hover' } };
export const PrimaryDisabled: Story = { args: { Style: 'Primary', State: 'Disabled' } };
export const OutlineDefault: Story = { args: { Style: 'Outline', State: 'Default' } };
export const OutlineHover: Story = { args: { Style: 'Outline', State: 'Hover' } };
export const OutlineDisabled: Story = { args: { Style: 'Outline', State: 'Disabled' } };
export const GhostDefault: Story = { args: { Style: 'Ghost', State: 'Default' } };
export const GhostHover: Story = { args: { Style: 'Ghost', State: 'Hover' } };
export const GhostDisabled: Story = { args: { Style: 'Ghost', State: 'Disabled' } };

// Examples: Figma usage notes on Ghost in toolbars and Show badge, not matrix rows.
export const ExampleToolbar: Story = {
  name: 'Example: in a toolbar',
  args: { 'aria-label': 'Notifications' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-element)' }}>
      <IconButton Style="Ghost" aria-label="Notifications" />
      <IconButton Style="Ghost" aria-label="Messages" />
    </div>
  ),
};

export const ExampleNewNotifications: Story = {
  name: 'Example: something new',
  args: { Style: 'Outline', 'Show badge': true, 'aria-label': 'Notifications, 3 unread' },
};
