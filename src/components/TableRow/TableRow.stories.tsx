// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=112-32
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableRow } from './TableRow';

const meta = {
  title: 'Components/Table Row',
  component: TableRow,
  decorators: [
    (Story, context) => {
      const Section = context.args.Type === 'Header' ? 'thead' : 'tbody';
      return (
        <table style={{ borderCollapse: 'collapse' }}>
          <Section>
            <Story />
          </Section>
        </table>
      );
    },
  ],
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = { args: { Type: 'Header' } };
export const Body: Story = { args: { Type: 'Body' } };
export const BodyHover: Story = { args: { Type: 'Body Hover' } };
