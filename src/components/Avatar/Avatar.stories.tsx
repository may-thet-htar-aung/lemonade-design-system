// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=192-54
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '../IconButton/IconButton';
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

// Examples: Figma usage notes on the Back Office header and on lists, not matrix rows.
export const ExampleBackOfficeHeader: Story = {
  name: 'Example: in the Back Office header',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-element)' }}>
      <IconButton Style="Ghost" aria-label="Notifications" />
      <Avatar Size="Medium" aria-label="Aye Chan" />
    </div>
  ),
};

export const ExampleInAList: Story = {
  name: 'Example: in a list, with the name nearby',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-element)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-element)' }}>
        <Avatar Size="Small" Initials="AC" aria-label="Aye Chan" />
        Aye Chan
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-element)' }}>
        <Avatar Size="Small" Initials="MT" aria-label="Min Thu" />
        Min Thu
      </div>
    </div>
  ),
};
