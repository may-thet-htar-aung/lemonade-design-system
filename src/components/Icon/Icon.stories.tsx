// Figma node: https://www.figma.com/design/AVDd45Hg9VOvZFgkykg9X3/Lemonade-Icons?node-id=16-1062
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowRight: Story = { args: { Name: 'arrow-right', Size: 'lg' } };
export const Bell: Story = { args: { Name: 'bell', Size: 'lg' } };
export const Box: Story = { args: { Name: 'box', Size: 'lg' } };
export const Building: Story = { args: { Name: 'building', Size: 'lg' } };
export const Camera: Story = { args: { Name: 'camera', Size: 'lg' } };
export const Check: Story = { args: { Name: 'check', Size: 'lg' } };
export const ChevronDown: Story = { args: { Name: 'chevron-down', Size: 'lg' } };
export const ChevronLeft: Story = { args: { Name: 'chevron-left', Size: 'lg' } };
export const ChevronRight: Story = { args: { Name: 'chevron-right', Size: 'lg' } };
export const Clock: Story = { args: { Name: 'clock', Size: 'lg' } };
export const Collapse: Story = { args: { Name: 'collapse', Size: 'lg' } };
export const Dashboard: Story = { args: { Name: 'dashboard', Size: 'lg' } };
export const Expand: Story = { args: { Name: 'expand', Size: 'lg' } };
export const Eye: Story = { args: { Name: 'eye', Size: 'lg' } };
export const EyeOff: Story = { args: { Name: 'eye-off', Size: 'lg' } };
export const File: Story = { args: { Name: 'file', Size: 'lg' } };
export const Filter: Story = { args: { Name: 'filter', Size: 'lg' } };
export const Flag: Story = { args: { Name: 'flag', Size: 'lg' } };
export const Handover: Story = { args: { Name: 'handover', Size: 'lg' } };
export const Home: Story = { args: { Name: 'home', Size: 'lg' } };
export const Key: Story = { args: { Name: 'key', Size: 'lg' } };
export const List: Story = { args: { Name: 'list', Size: 'lg' } };
export const Lock: Story = { args: { Name: 'lock', Size: 'lg' } };
export const Maximize: Story = { args: { Name: 'maximize', Size: 'lg' } };
export const Menu: Story = { args: { Name: 'menu', Size: 'lg' } };
export const Pin: Story = { args: { Name: 'pin', Size: 'lg' } };
export const Plus: Story = { args: { Name: 'plus', Size: 'lg' } };
export const Search: Story = { args: { Name: 'search', Size: 'lg' } };
export const Shield: Story = { args: { Name: 'shield', Size: 'lg' } };
export const Sparkle: Story = { args: { Name: 'sparkle', Size: 'lg' } };
export const User: Story = { args: { Name: 'user', Size: 'lg' } };
export const Users: Story = { args: { Name: 'users', Size: 'lg' } };
export const X: Story = { args: { Name: 'x', Size: 'lg' } };
export const UserSm: Story = { args: { Name: 'user', Size: 'sm' } };
export const UserMd: Story = { args: { Name: 'user', Size: 'md' } };
export const UserXl: Story = { args: { Name: 'user', Size: 'xl' } };
