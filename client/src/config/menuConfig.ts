import {
  PieChartTwoTone,
  FundTwoTone,
  EditTwoTone,
  DiffTwoTone,
} from "@ant-design/icons";

export interface MenuItemConfig {
  label: string;
  // Redirect path
  path?: string;
  icon?: React.ComponentType;
  // sub menu items
  children?: MenuItemConfig[];
  // Indicate the order of the menu item
  rank: number;
}

/**
 * MenuConfig is a map of menu items, the key is the menu group name, the value is the menu items
 * The menu items will be sorted by the rank.
 * Note: It should be get from the backend in the future.
 */
export const MenuConfig: Record<string, MenuItemConfig[]> = {
  default: [
    { label: "首页", path: "/dashboard", icon: PieChartTwoTone, rank: 1 },
    { label: "笔记优化", path: "/option2", icon: FundTwoTone, rank: 2 },
    { label: "上传文件", path: "/upload", icon: DiffTwoTone, rank: 999 },
  ],
  FOO: [
    {
      label: "品牌",
      icon: EditTwoTone,
      rank: 3,
      children: [
        { label: "OLAY", path: "/brand/brand", rank: 6 },
        { label: "丰添", path: "/brand/brand1", rank: 2 },
        { label: "好人家", path: "/brand/brand2", rank: 3 },
      ],
    },
  ],
  Olay: [
    {
      label: "品牌",
      icon: EditTwoTone,
      rank: 4,
      children: [{ label: "OLAY", path: "/brand/brand", rank: 1 }],
    },
  ],
  好人家: [
    {
      label: "品牌",
      icon: EditTwoTone,
      rank: 5,
      children: [{ label: "好人家", path: "/brand/brand", rank: 2 }],
    },
  ],
};
