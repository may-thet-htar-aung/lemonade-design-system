// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=160-307
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { DialogBox } from './DialogBox';
import type { DialogBoxProps } from './DialogBox';

/* The variant matrix has two rows: Type = Default (160:263) and
   Type = Danger (160:285). "Show callout" is a boolean property, not a
   variant, and is a control on both stories.

   Each story opens with the dialog showing. Cancel, Confirm and Escape close
   it and return focus to the trigger; "Open dialog" opens it again. */
function DialogDemo(args: DialogBoxProps) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button Style="Outline" Label="Open dialog" onClick={() => setOpen(true)} />
      <DialogBox
        {...args}
        open={open}
        onCancel={() => {
          args.onCancel?.();
          setOpen(false);
        }}
        onConfirm={() => {
          args.onConfirm?.();
          setOpen(false);
        }}
      />
    </>
  );
}

const meta = {
  title: 'Components/Dialog Box',
  component: DialogBox,
  args: { 'Show callout': true },
  render: (args) => <DialogDemo {...args} />,
} satisfies Meta<typeof DialogBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { Type: 'Default' } };
export const Danger: Story = { args: { Type: 'Danger' } };

// Examples: Figma usage notes on approving a claim and on Danger, not matrix rows.
export const ExampleApproveAClaim: Story = {
  name: 'Example: approve a claim',
  args: {
    Type: 'Default',
    Title: 'Approve this claim?',
    Body: 'The owner will be told to collect the item.',
    ConfirmLabel: 'Approve claim',
  },
};

export const ExampleRejectAClaim: Story = {
  name: 'Example: reject a claim',
  args: {
    Type: 'Danger',
    'Show callout': false,
    Title: 'Reject this claim?',
    Body: 'The owner will be told it was rejected.',
    ConfirmLabel: 'Reject claim',
  },
};
