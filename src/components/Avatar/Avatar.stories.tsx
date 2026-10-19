// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=192-54
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { 'aria-label': 'Aye Chan', State: 'Default' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InitialsSmall: Story = { args: { Type: 'Initials', Size: 'Small' } };
export const InitialsMedium: Story = { args: { Type: 'Initials', Size: 'Medium' } };
export const InitialsLarge: Story = { args: { Type: 'Initials', Size: 'Large' } };
export const ImageSmall: Story = { args: { Type: 'Image', Size: 'Small' } };
export const ImageMedium: Story = { args: { Type: 'Image', Size: 'Medium' } };
export const ImageLarge: Story = { args: { Type: 'Image', Size: 'Large' } };

export const InitialsSmallHover: Story = { args: { Type: 'Initials', Size: 'Small', State: 'Hover' } };
export const InitialsMediumHover: Story = { args: { Type: 'Initials', Size: 'Medium', State: 'Hover' } };
export const InitialsLargeHover: Story = { args: { Type: 'Initials', Size: 'Large', State: 'Hover' } };
export const ImageSmallHover: Story = { args: { Type: 'Image', Size: 'Small', State: 'Hover' } };
export const ImageMediumHover: Story = { args: { Type: 'Image', Size: 'Medium', State: 'Hover' } };
export const ImageLargeHover: Story = { args: { Type: 'Image', Size: 'Large', State: 'Hover' } };
