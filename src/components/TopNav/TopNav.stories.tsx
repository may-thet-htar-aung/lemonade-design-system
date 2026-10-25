// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=161-415
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNav } from './TopNav';

/* Variant matrix from the node: Page = Home | Browse | Report | Track.
   Four rows, one story each. */
const meta = {
  title: 'Components/Top Nav',
  component: TopNav,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = { args: { Page: 'Home' } };
export const Browse: Story = { args: { Page: 'Browse' } };
export const Report: Story = { args: { Page: 'Report' } };
export const Track: Story = { args: { Page: 'Track' } };
