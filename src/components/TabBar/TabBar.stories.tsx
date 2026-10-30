// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=159-141
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabBar } from './TabBar';

/* Variant matrix from the node: Active = Home | Search | Report | Activity |
   Profile. Five rows, one story each. */
const meta = {
  title: 'Components/Tab Bar',
  component: TabBar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = { args: { Active: 'Home' } };
export const Search: Story = { args: { Active: 'Search' } };
export const Report: Story = { args: { Active: 'Report' } };
export const Activity: Story = { args: { Active: 'Activity' } };
export const Profile: Story = { args: { Active: 'Profile' } };

// Example: Figma usage note "Use it at the bottom of every main screen", not a matrix row.
export const ExampleBottomOfScreen: Story = {
  name: 'Example: bottom of a screen',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-section)' }}>
      <p>Screen content</p>
      <TabBar Active="Search" />
    </div>
  ),
};
