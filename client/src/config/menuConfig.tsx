import {
  PieChartTwoTone,
  FundTwoTone,
  EditTwoTone,
  DiffTwoTone,
  ContainerTwoTone,
  BoxPlotTwoTone,
  AppstoreTwoTone,
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
    {
      label: "数据可视化",
      icon:FundTwoTone ,
      rank: 2,
      children: [
        { label: "TTL 分析", path: "/ttl", rank: 1 },
        { label: "达成总览", path: "/reachtracking",rank: 2},
        { label: "舆情分析", path: "/yq", rank: 3 },
      ],
    },
    { label: "笔记优化", path: "/option2", icon: ContainerTwoTone, rank: 3 },
    { label: "上传文件", path: "/upload", icon: DiffTwoTone, rank: 999 },
    {
      label: "数据追踪",
      icon:    AppstoreTwoTone ,
      rank: 3,
      children: [
        { label: "小红书-蒲公英", path: "/solardata", rank: 1 },
        { label: "小红书-聚光", path: "/auroradata", rank: 2},
        { label: "皮尔森系数", path: "/pccsdata", rank: 3 },
      ],
    },
  ],
  // FOO: [
  //   {
  //     label: "数据",
  //     icon: EditTwoTone,
  //     rank: 3,
  //     children: [
  //       { label: "小红书-蒲公英", path: "/brand/brand",icon:    FundTwoTone , rank: 4 },
  //       { label: "小红书-聚光", path: "/brand/brand1", icon:    FundTwoTone ,rank: 3 },
  //       { label: "皮尔森系数", path: "/brand/brand2", icon:    FundTwoTone ,rank: 2 },
  //     ],
  //   },
  // ],
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
