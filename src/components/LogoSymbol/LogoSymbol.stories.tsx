// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=23-1470
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoSymbol } from './LogoSymbol';

const meta = {
  title: 'Components/LogoSymbol',
  component: LogoSymbol,
} satisfies Meta<typeof LogoSymbol>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandSmall: Story = { args: { Color: 'Brand', Size: 'Small' } };
export const BrandMedium: Story = { args: { Color: 'Brand', Size: 'Medium' } };
export const BrandLarge: Story = { args: { Color: 'Brand', Size: 'Large' } };
export const BlackSmall: Story = { args: { Color: 'Black', Size: 'Small' } };
export const BlackMedium: Story = { args: { Color: 'Black', Size: 'Medium' } };
export const BlackLarge: Story = { args: { Color: 'Black', Size: 'Large' } };
export const WhiteSmall: Story = { args: { Color: 'White', Size: 'Small' } };
export const WhiteMedium: Story = { args: { Color: 'White', Size: 'Medium' } };
export const WhiteLarge: Story = { args: { Color: 'White', Size: 'Large' } };
