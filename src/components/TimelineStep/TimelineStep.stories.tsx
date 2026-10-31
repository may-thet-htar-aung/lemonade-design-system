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

// Example: Figma usage notes on order, state and the last step's line, not a matrix row.
export const ExampleCaseTimeline: Story = {
  name: 'Example: a case timeline',
  render: () => (
    <>
      <TimelineStep State="Done" Title="Report received" Subtitle="Today, 09:12" />
      <TimelineStep State="Done" Title="Match found" Subtitle="Today, 10:40" />
      <TimelineStep State="Current" Title="Ownership check" Subtitle="Today, 11:05" />
      <TimelineStep State="Upcoming" Title="Handover" Subtitle="Not scheduled" {...{ 'Show line': false }} />
    </>
  ),
};
