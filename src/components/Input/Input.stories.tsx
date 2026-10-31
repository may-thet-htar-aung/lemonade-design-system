// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=88-62
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDefault: Story = { args: { Type: 'Single', State: 'Default' } };
export const SingleFocused: Story = { args: { Type: 'Single', State: 'Focused' } };
export const SingleError: Story = { args: { Type: 'Single', State: 'Error' } };
export const SingleDisabled: Story = { args: { Type: 'Single', State: 'Disabled' } };

export const MultiDefault: Story = { args: { Type: 'Multi', State: 'Default' } };
export const MultiFocused: Story = { args: { Type: 'Multi', State: 'Focused' } };
export const MultiError: Story = { args: { Type: 'Multi', State: 'Error' } };
export const MultiDisabled: Story = { args: { Type: 'Multi', State: 'Disabled' } };

export const PasswordHiddenDefault: Story = { args: { Type: 'Password Hidden', State: 'Default', defaultValue: 'lemonade' } };
export const PasswordHiddenFocused: Story = { args: { Type: 'Password Hidden', State: 'Focused', defaultValue: 'lemonade' } };
export const PasswordHiddenError: Story = { args: { Type: 'Password Hidden', State: 'Error', defaultValue: 'lemonade' } };
export const PasswordHiddenDisabled: Story = { args: { Type: 'Password Hidden', State: 'Disabled', defaultValue: 'lemonade' } };

export const PasswordShownDefault: Story = { args: { Type: 'Password Shown', State: 'Default', defaultValue: 'lemonade2026' } };
export const PasswordShownFocused: Story = { args: { Type: 'Password Shown', State: 'Focused', defaultValue: 'lemonade2026' } };
export const PasswordShownError: Story = { args: { Type: 'Password Shown', State: 'Error', defaultValue: 'lemonade2026' } };
export const PasswordShownDisabled: Story = { args: { Type: 'Password Shown', State: 'Disabled', defaultValue: 'lemonade2026' } };

// Example: Figma usage note "Set the width to Fill in forms", not a matrix row.
export const ExampleInAForm: Story = {
  name: 'Example: in a form',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-component)' }}>
      <Input Label="Item name" Placeholder="Black leather wallet" />
      <Input Type="Multi" Label="Describe the item" Placeholder="Where you lost it, and anything that stands out" />
      <Input State="Error" Label="Station" Helper="Enter the station where you lost it." />
    </div>
  ),
};
