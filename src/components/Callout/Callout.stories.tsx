// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=109-69
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../Input/Input';
import { Callout } from './Callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Privacy: Story = { args: { Type: 'Privacy' } };
export const AIMatch: Story = { args: { Type: 'AI Match' } };

// Example: Figma usage notes "Place it just above the content it explains" and the claim form, not a matrix row.
export const ExampleAboveAForm: Story = {
  name: 'Example: above the content it explains',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-component)' }}>
      <Callout Type="Privacy" />
      <Input Label="Serial number" Placeholder="Enter the serial number" />
    </div>
  ),
};
