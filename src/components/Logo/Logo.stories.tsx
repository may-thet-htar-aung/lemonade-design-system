// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=23-1348
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightSmall: Story = { args: { Theme: 'Light', Size: 'Small' } };
export const DarkSmall: Story = { args: { Theme: 'Dark', Size: 'Small' } };
export const BlackSmall: Story = { args: { Theme: 'Black', Size: 'Small' } };
export const WhiteSmall: Story = { args: { Theme: 'White', Size: 'Small' } };
export const LightMedium: Story = { args: { Theme: 'Light', Size: 'Medium' } };
export const DarkMedium: Story = { args: { Theme: 'Dark', Size: 'Medium' } };
export const BlackMedium: Story = { args: { Theme: 'Black', Size: 'Medium' } };
export const WhiteMedium: Story = { args: { Theme: 'White', Size: 'Medium' } };
export const LightLarge: Story = { args: { Theme: 'Light', Size: 'Large' } };
export const DarkLarge: Story = { args: { Theme: 'Dark', Size: 'Large' } };
export const BlackLarge: Story = { args: { Theme: 'Black', Size: 'Large' } };
export const WhiteLarge: Story = { args: { Theme: 'White', Size: 'Large' } };

// Example: Figma usage note "Use Dark on brand-green or photo backgrounds", not a matrix row.
export const ExampleOnBrandGreen: Story = {
  name: 'Example: on brand green',
  render: () => (
    <div style={{ background: 'var(--color-bg-static-brandgreen)', padding: 'var(--gap-gutter)' }}>
      <Logo Theme="Dark" Size="Medium" />
    </div>
  ),
};
