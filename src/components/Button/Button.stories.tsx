// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=165-1639
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon/Icon';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

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

// Examples: Figma usage notes on Primary with Outline, Icon Left and Ghost, not matrix rows.
export const ExamplePrimaryWithOutline: Story = {
  name: 'Example: Primary next to Outline',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-element)' }}>
      <Button Style="Outline" Label="Cancel" />
      <Button Style="Primary" Label="Report lost item" />
    </div>
  ),
};

export const ExampleWithIcon: Story = {
  name: 'Example: with an icon',
  args: { Style: 'Primary', Label: 'Add item', 'Icon Left': true, 'Icon Left swap': <Icon Name="plus" Size="md" /> },
};

export const ExampleToolbar: Story = {
  name: 'Example: Ghost in a toolbar',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-element)' }}>
      <Button Style="Ghost" Label="Export" />
      <Button Style="Ghost" Label="Refresh" />
    </div>
  ),
};
