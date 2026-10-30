// Figma node: https://www.figma.com/design/AVDd45Hg9VOvZFgkykg9X3/Lemonade-Icons?node-id=76-12
// Matrix: Name (33 values, component set 76:12) x Size (sm, md, lg, xl, 2xl, 3xl:
// the documented 16, 18, 24, 32, 40 and 48 range, Size Range 16:1086) = 198 stories.
// lg is the 24 x 24 default of the set, so its stories carry the bare icon name.
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Size sm
export const ArrowRightSm: Story = { args: { Name: "arrow-right", Size: "sm" } };
export const BellSm: Story = { args: { Name: "bell", Size: "sm" } };
export const BoxSm: Story = { args: { Name: "box", Size: "sm" } };
export const BuildingSm: Story = { args: { Name: "building", Size: "sm" } };
export const CameraSm: Story = { args: { Name: "camera", Size: "sm" } };
export const CheckSm: Story = { args: { Name: "check", Size: "sm" } };
export const ChevronDownSm: Story = { args: { Name: "chevron-down", Size: "sm" } };
export const ChevronLeftSm: Story = { args: { Name: "chevron-left", Size: "sm" } };
export const ChevronRightSm: Story = { args: { Name: "chevron-right", Size: "sm" } };
export const ClockSm: Story = { args: { Name: "clock", Size: "sm" } };
export const CollapseSm: Story = { args: { Name: "collapse", Size: "sm" } };
export const DashboardSm: Story = { args: { Name: "dashboard", Size: "sm" } };
export const ExpandSm: Story = { args: { Name: "expand", Size: "sm" } };
export const EyeSm: Story = { args: { Name: "eye", Size: "sm" } };
export const EyeOffSm: Story = { args: { Name: "eye-off", Size: "sm" } };
export const FileSm: Story = { args: { Name: "file", Size: "sm" } };
export const FilterSm: Story = { args: { Name: "filter", Size: "sm" } };
export const FlagSm: Story = { args: { Name: "flag", Size: "sm" } };
export const HandoverSm: Story = { args: { Name: "handover", Size: "sm" } };
export const HomeSm: Story = { args: { Name: "home", Size: "sm" } };
export const KeySm: Story = { args: { Name: "key", Size: "sm" } };
export const ListSm: Story = { args: { Name: "list", Size: "sm" } };
export const LockSm: Story = { args: { Name: "lock", Size: "sm" } };
export const MaximizeSm: Story = { args: { Name: "maximize", Size: "sm" } };
export const MenuSm: Story = { args: { Name: "menu", Size: "sm" } };
export const PinSm: Story = { args: { Name: "pin", Size: "sm" } };
export const PlusSm: Story = { args: { Name: "plus", Size: "sm" } };
export const SearchSm: Story = { args: { Name: "search", Size: "sm" } };
export const ShieldSm: Story = { args: { Name: "shield", Size: "sm" } };
export const SparkleSm: Story = { args: { Name: "sparkle", Size: "sm" } };
export const UserSm: Story = { args: { Name: "user", Size: "sm" } };
export const UsersSm: Story = { args: { Name: "users", Size: "sm" } };
export const XSm: Story = { args: { Name: "x", Size: "sm" } };

// Size md
export const ArrowRightMd: Story = { args: { Name: "arrow-right", Size: "md" } };
export const BellMd: Story = { args: { Name: "bell", Size: "md" } };
export const BoxMd: Story = { args: { Name: "box", Size: "md" } };
export const BuildingMd: Story = { args: { Name: "building", Size: "md" } };
export const CameraMd: Story = { args: { Name: "camera", Size: "md" } };
export const CheckMd: Story = { args: { Name: "check", Size: "md" } };
export const ChevronDownMd: Story = { args: { Name: "chevron-down", Size: "md" } };
export const ChevronLeftMd: Story = { args: { Name: "chevron-left", Size: "md" } };
export const ChevronRightMd: Story = { args: { Name: "chevron-right", Size: "md" } };
export const ClockMd: Story = { args: { Name: "clock", Size: "md" } };
export const CollapseMd: Story = { args: { Name: "collapse", Size: "md" } };
export const DashboardMd: Story = { args: { Name: "dashboard", Size: "md" } };
export const ExpandMd: Story = { args: { Name: "expand", Size: "md" } };
export const EyeMd: Story = { args: { Name: "eye", Size: "md" } };
export const EyeOffMd: Story = { args: { Name: "eye-off", Size: "md" } };
export const FileMd: Story = { args: { Name: "file", Size: "md" } };
export const FilterMd: Story = { args: { Name: "filter", Size: "md" } };
export const FlagMd: Story = { args: { Name: "flag", Size: "md" } };
export const HandoverMd: Story = { args: { Name: "handover", Size: "md" } };
export const HomeMd: Story = { args: { Name: "home", Size: "md" } };
export const KeyMd: Story = { args: { Name: "key", Size: "md" } };
export const ListMd: Story = { args: { Name: "list", Size: "md" } };
export const LockMd: Story = { args: { Name: "lock", Size: "md" } };
export const MaximizeMd: Story = { args: { Name: "maximize", Size: "md" } };
export const MenuMd: Story = { args: { Name: "menu", Size: "md" } };
export const PinMd: Story = { args: { Name: "pin", Size: "md" } };
export const PlusMd: Story = { args: { Name: "plus", Size: "md" } };
export const SearchMd: Story = { args: { Name: "search", Size: "md" } };
export const ShieldMd: Story = { args: { Name: "shield", Size: "md" } };
export const SparkleMd: Story = { args: { Name: "sparkle", Size: "md" } };
export const UserMd: Story = { args: { Name: "user", Size: "md" } };
export const UsersMd: Story = { args: { Name: "users", Size: "md" } };
export const XMd: Story = { args: { Name: "x", Size: "md" } };

// Size lg
export const ArrowRight: Story = { args: { Name: "arrow-right", Size: "lg" } };
export const Bell: Story = { args: { Name: "bell", Size: "lg" } };
export const Box: Story = { args: { Name: "box", Size: "lg" } };
export const Building: Story = { args: { Name: "building", Size: "lg" } };
export const Camera: Story = { args: { Name: "camera", Size: "lg" } };
export const Check: Story = { args: { Name: "check", Size: "lg" } };
export const ChevronDown: Story = { args: { Name: "chevron-down", Size: "lg" } };
export const ChevronLeft: Story = { args: { Name: "chevron-left", Size: "lg" } };
export const ChevronRight: Story = { args: { Name: "chevron-right", Size: "lg" } };
export const Clock: Story = { args: { Name: "clock", Size: "lg" } };
export const Collapse: Story = { args: { Name: "collapse", Size: "lg" } };
export const Dashboard: Story = { args: { Name: "dashboard", Size: "lg" } };
export const Expand: Story = { args: { Name: "expand", Size: "lg" } };
export const Eye: Story = { args: { Name: "eye", Size: "lg" } };
export const EyeOff: Story = { args: { Name: "eye-off", Size: "lg" } };
export const File: Story = { args: { Name: "file", Size: "lg" } };
export const Filter: Story = { args: { Name: "filter", Size: "lg" } };
export const Flag: Story = { args: { Name: "flag", Size: "lg" } };
export const Handover: Story = { args: { Name: "handover", Size: "lg" } };
export const Home: Story = { args: { Name: "home", Size: "lg" } };
export const Key: Story = { args: { Name: "key", Size: "lg" } };
export const List: Story = { args: { Name: "list", Size: "lg" } };
export const Lock: Story = { args: { Name: "lock", Size: "lg" } };
export const Maximize: Story = { args: { Name: "maximize", Size: "lg" } };
export const Menu: Story = { args: { Name: "menu", Size: "lg" } };
export const Pin: Story = { args: { Name: "pin", Size: "lg" } };
export const Plus: Story = { args: { Name: "plus", Size: "lg" } };
export const Search: Story = { args: { Name: "search", Size: "lg" } };
export const Shield: Story = { args: { Name: "shield", Size: "lg" } };
export const Sparkle: Story = { args: { Name: "sparkle", Size: "lg" } };
export const User: Story = { args: { Name: "user", Size: "lg" } };
export const Users: Story = { args: { Name: "users", Size: "lg" } };
export const X: Story = { args: { Name: "x", Size: "lg" } };

// Size xl
export const ArrowRightXl: Story = { args: { Name: "arrow-right", Size: "xl" } };
export const BellXl: Story = { args: { Name: "bell", Size: "xl" } };
export const BoxXl: Story = { args: { Name: "box", Size: "xl" } };
export const BuildingXl: Story = { args: { Name: "building", Size: "xl" } };
export const CameraXl: Story = { args: { Name: "camera", Size: "xl" } };
export const CheckXl: Story = { args: { Name: "check", Size: "xl" } };
export const ChevronDownXl: Story = { args: { Name: "chevron-down", Size: "xl" } };
export const ChevronLeftXl: Story = { args: { Name: "chevron-left", Size: "xl" } };
export const ChevronRightXl: Story = { args: { Name: "chevron-right", Size: "xl" } };
export const ClockXl: Story = { args: { Name: "clock", Size: "xl" } };
export const CollapseXl: Story = { args: { Name: "collapse", Size: "xl" } };
export const DashboardXl: Story = { args: { Name: "dashboard", Size: "xl" } };
export const ExpandXl: Story = { args: { Name: "expand", Size: "xl" } };
export const EyeXl: Story = { args: { Name: "eye", Size: "xl" } };
export const EyeOffXl: Story = { args: { Name: "eye-off", Size: "xl" } };
export const FileXl: Story = { args: { Name: "file", Size: "xl" } };
export const FilterXl: Story = { args: { Name: "filter", Size: "xl" } };
export const FlagXl: Story = { args: { Name: "flag", Size: "xl" } };
export const HandoverXl: Story = { args: { Name: "handover", Size: "xl" } };
export const HomeXl: Story = { args: { Name: "home", Size: "xl" } };
export const KeyXl: Story = { args: { Name: "key", Size: "xl" } };
export const ListXl: Story = { args: { Name: "list", Size: "xl" } };
export const LockXl: Story = { args: { Name: "lock", Size: "xl" } };
export const MaximizeXl: Story = { args: { Name: "maximize", Size: "xl" } };
export const MenuXl: Story = { args: { Name: "menu", Size: "xl" } };
export const PinXl: Story = { args: { Name: "pin", Size: "xl" } };
export const PlusXl: Story = { args: { Name: "plus", Size: "xl" } };
export const SearchXl: Story = { args: { Name: "search", Size: "xl" } };
export const ShieldXl: Story = { args: { Name: "shield", Size: "xl" } };
export const SparkleXl: Story = { args: { Name: "sparkle", Size: "xl" } };
export const UserXl: Story = { args: { Name: "user", Size: "xl" } };
export const UsersXl: Story = { args: { Name: "users", Size: "xl" } };
export const XXl: Story = { args: { Name: "x", Size: "xl" } };

// Size 2xl
export const ArrowRight2xl: Story = { args: { Name: "arrow-right", Size: "2xl" } };
export const Bell2xl: Story = { args: { Name: "bell", Size: "2xl" } };
export const Box2xl: Story = { args: { Name: "box", Size: "2xl" } };
export const Building2xl: Story = { args: { Name: "building", Size: "2xl" } };
export const Camera2xl: Story = { args: { Name: "camera", Size: "2xl" } };
export const Check2xl: Story = { args: { Name: "check", Size: "2xl" } };
export const ChevronDown2xl: Story = { args: { Name: "chevron-down", Size: "2xl" } };
export const ChevronLeft2xl: Story = { args: { Name: "chevron-left", Size: "2xl" } };
export const ChevronRight2xl: Story = { args: { Name: "chevron-right", Size: "2xl" } };
export const Clock2xl: Story = { args: { Name: "clock", Size: "2xl" } };
export const Collapse2xl: Story = { args: { Name: "collapse", Size: "2xl" } };
export const Dashboard2xl: Story = { args: { Name: "dashboard", Size: "2xl" } };
export const Expand2xl: Story = { args: { Name: "expand", Size: "2xl" } };
export const Eye2xl: Story = { args: { Name: "eye", Size: "2xl" } };
export const EyeOff2xl: Story = { args: { Name: "eye-off", Size: "2xl" } };
export const File2xl: Story = { args: { Name: "file", Size: "2xl" } };
export const Filter2xl: Story = { args: { Name: "filter", Size: "2xl" } };
export const Flag2xl: Story = { args: { Name: "flag", Size: "2xl" } };
export const Handover2xl: Story = { args: { Name: "handover", Size: "2xl" } };
export const Home2xl: Story = { args: { Name: "home", Size: "2xl" } };
export const Key2xl: Story = { args: { Name: "key", Size: "2xl" } };
export const List2xl: Story = { args: { Name: "list", Size: "2xl" } };
export const Lock2xl: Story = { args: { Name: "lock", Size: "2xl" } };
export const Maximize2xl: Story = { args: { Name: "maximize", Size: "2xl" } };
export const Menu2xl: Story = { args: { Name: "menu", Size: "2xl" } };
export const Pin2xl: Story = { args: { Name: "pin", Size: "2xl" } };
export const Plus2xl: Story = { args: { Name: "plus", Size: "2xl" } };
export const Search2xl: Story = { args: { Name: "search", Size: "2xl" } };
export const Shield2xl: Story = { args: { Name: "shield", Size: "2xl" } };
export const Sparkle2xl: Story = { args: { Name: "sparkle", Size: "2xl" } };
export const User2xl: Story = { args: { Name: "user", Size: "2xl" } };
export const Users2xl: Story = { args: { Name: "users", Size: "2xl" } };
export const X2xl: Story = { args: { Name: "x", Size: "2xl" } };

// Size 3xl
export const ArrowRight3xl: Story = { args: { Name: "arrow-right", Size: "3xl" } };
export const Bell3xl: Story = { args: { Name: "bell", Size: "3xl" } };
export const Box3xl: Story = { args: { Name: "box", Size: "3xl" } };
export const Building3xl: Story = { args: { Name: "building", Size: "3xl" } };
export const Camera3xl: Story = { args: { Name: "camera", Size: "3xl" } };
export const Check3xl: Story = { args: { Name: "check", Size: "3xl" } };
export const ChevronDown3xl: Story = { args: { Name: "chevron-down", Size: "3xl" } };
export const ChevronLeft3xl: Story = { args: { Name: "chevron-left", Size: "3xl" } };
export const ChevronRight3xl: Story = { args: { Name: "chevron-right", Size: "3xl" } };
export const Clock3xl: Story = { args: { Name: "clock", Size: "3xl" } };
export const Collapse3xl: Story = { args: { Name: "collapse", Size: "3xl" } };
export const Dashboard3xl: Story = { args: { Name: "dashboard", Size: "3xl" } };
export const Expand3xl: Story = { args: { Name: "expand", Size: "3xl" } };
export const Eye3xl: Story = { args: { Name: "eye", Size: "3xl" } };
export const EyeOff3xl: Story = { args: { Name: "eye-off", Size: "3xl" } };
export const File3xl: Story = { args: { Name: "file", Size: "3xl" } };
export const Filter3xl: Story = { args: { Name: "filter", Size: "3xl" } };
export const Flag3xl: Story = { args: { Name: "flag", Size: "3xl" } };
export const Handover3xl: Story = { args: { Name: "handover", Size: "3xl" } };
export const Home3xl: Story = { args: { Name: "home", Size: "3xl" } };
export const Key3xl: Story = { args: { Name: "key", Size: "3xl" } };
export const List3xl: Story = { args: { Name: "list", Size: "3xl" } };
export const Lock3xl: Story = { args: { Name: "lock", Size: "3xl" } };
export const Maximize3xl: Story = { args: { Name: "maximize", Size: "3xl" } };
export const Menu3xl: Story = { args: { Name: "menu", Size: "3xl" } };
export const Pin3xl: Story = { args: { Name: "pin", Size: "3xl" } };
export const Plus3xl: Story = { args: { Name: "plus", Size: "3xl" } };
export const Search3xl: Story = { args: { Name: "search", Size: "3xl" } };
export const Shield3xl: Story = { args: { Name: "shield", Size: "3xl" } };
export const Sparkle3xl: Story = { args: { Name: "sparkle", Size: "3xl" } };
export const User3xl: Story = { args: { Name: "user", Size: "3xl" } };
export const Users3xl: Story = { args: { Name: "users", Size: "3xl" } };
export const X3xl: Story = { args: { Name: "x", Size: "3xl" } };

// Examples: Figma usage notes on text labels and accessible names, not matrix rows.
export const ExampleWithTextLabel: Story = {
  name: "Example: with a text label",
  args: { Name: "pin" },
  render: () => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--gap-element)" }}>
      <Icon Name="pin" Size="md" />
      Drop-off point
    </span>
  ),
};

export const ExampleWithAccessibleName: Story = {
  name: "Example: on its own, with Label",
  args: { Name: "search", Label: "Search" },
};
