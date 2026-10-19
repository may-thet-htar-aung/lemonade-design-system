// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=110-34
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelineStep } from './TimelineStep';

const meta = {
  title: 'Components/Timeline Step',
  component: TimelineStep,
  decorators: [
    (Story) => (
      <ol style={{ margin: 0, padding: 0 }}>
        <Story />
      </ol>
    ),
  ],
} satisfies Meta<typeof TimelineStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Upcoming: Story = { args: { State: 'Upcoming' } };
export const Current: Story = { args: { State: 'Current' } };
export const Done: Story = { args: { State: 'Done' } };
export const Event: Story = { args: { State: 'Event' } };
