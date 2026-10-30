// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=163-295
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from '../StatCard/StatCard';
import { Sidebar } from './Sidebar';

/* Variant matrix from the node: Collapsed = False | True ×
   Active = Dashboard | Reports | Matches | Claims | Users & Venues | Handovers.
   Twelve rows, one story each. */
const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CollapsedFalseDashboard: Story = {
  name: 'Collapsed=False, Active=Dashboard',
  args: { Collapsed: 'False', Active: 'Dashboard' },
};
export const CollapsedFalseReports: Story = {
  name: 'Collapsed=False, Active=Reports',
  args: { Collapsed: 'False', Active: 'Reports' },
};
export const CollapsedFalseMatches: Story = {
  name: 'Collapsed=False, Active=Matches',
  args: { Collapsed: 'False', Active: 'Matches' },
};
export const CollapsedFalseClaims: Story = {
  name: 'Collapsed=False, Active=Claims',
  args: { Collapsed: 'False', Active: 'Claims' },
};
export const CollapsedFalseUsersVenues: Story = {
  name: 'Collapsed=False, Active=Users & Venues',
  args: { Collapsed: 'False', Active: 'Users & Venues' },
};
export const CollapsedFalseHandovers: Story = {
  name: 'Collapsed=False, Active=Handovers',
  args: { Collapsed: 'False', Active: 'Handovers' },
};
export const CollapsedTrueDashboard: Story = {
  name: 'Collapsed=True, Active=Dashboard',
  args: { Collapsed: 'True', Active: 'Dashboard' },
};
export const CollapsedTrueReports: Story = {
  name: 'Collapsed=True, Active=Reports',
  args: { Collapsed: 'True', Active: 'Reports' },
};
export const CollapsedTrueMatches: Story = {
  name: 'Collapsed=True, Active=Matches',
  args: { Collapsed: 'True', Active: 'Matches' },
};
export const CollapsedTrueClaims: Story = {
  name: 'Collapsed=True, Active=Claims',
  args: { Collapsed: 'True', Active: 'Claims' },
};
export const CollapsedTrueUsersVenues: Story = {
  name: 'Collapsed=True, Active=Users & Venues',
  args: { Collapsed: 'True', Active: 'Users & Venues' },
};
export const CollapsedTrueHandovers: Story = {
  name: 'Collapsed=True, Active=Handovers',
  args: { Collapsed: 'True', Active: 'Handovers' },
};

// Example: Figma usage note "Use it on the left of every Back Office screen", not a matrix row.
export const ExampleBackOfficeScreen: Story = {
  name: 'Example: left of a Back Office screen',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-gutter)' }}>
      <Sidebar Collapsed="True" />
      <div style={{ flex: 1, padding: 'var(--gap-gutter)' }}>
        <StatCard Label="Open reports" Value="128" Delta="+12 since yesterday" />
      </div>
    </div>
  ),
};
