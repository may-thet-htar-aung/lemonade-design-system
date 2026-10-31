// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=112-32
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableRow } from './TableRow';

const meta = {
  title: 'Components/Table Row',
  component: TableRow,
  decorators: [
    (Story, context) => {
      if (context.parameters.ownTable) return <Story />;
      const Section = context.args.Type === 'Header' ? 'thead' : 'tbody';
      return (
        <table>
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

// Example: Figma usage note "Start with one Header row, then Body rows with no gap", not a matrix row.
export const ExampleHeaderAndBodyRows: Story = {
  name: 'Example: a header row, then body rows',
  parameters: { ownTable: true },
  render: () => (
    <table>
      <thead>
        <TableRow Type="Header" />
      </thead>
      <tbody>
        <TableRow Type="Body" />
        <TableRow Type="Body" Reference="LF-2042" Item="Blue umbrella" Owner="Min Thu" Location="City Library" />
      </tbody>
    </table>
  ),
};
