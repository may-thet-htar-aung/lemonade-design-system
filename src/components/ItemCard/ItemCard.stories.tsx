// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=108-39
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ItemCard } from './ItemCard';

const meta = {
  title: 'Components/Item Card',
  component: ItemCard,
  args: {
    Title: 'Black leather wallet',
    Meta: 'Central Station · 2h ago',
    'Show status': true,
    State: 'Default',
    href: '#item',
  },
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridDefault: Story = { args: { Layout: 'Grid' } };
export const ListDefault: Story = { args: { Layout: 'List' } };
export const GridLargeDefault: Story = { args: { Layout: 'Grid Large' } };
export const GridHover: Story = { args: { Layout: 'Grid', State: 'Hover' } };
export const ListHover: Story = { args: { Layout: 'List', State: 'Hover' } };
export const GridLargeHover: Story = { args: { Layout: 'Grid Large', State: 'Hover' } };
