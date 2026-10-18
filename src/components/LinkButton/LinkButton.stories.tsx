// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=147-183
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkButton } from './LinkButton';

const meta = {
  title: 'Components/Link Button',
  component: LinkButton,
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { State: 'Default' } };
export const Hover: Story = { args: { State: 'Hover' } };
export const Disabled: Story = { args: { State: 'Disabled' } };
