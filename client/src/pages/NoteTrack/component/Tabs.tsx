import { Tabs as AntdTabs, type TabsProps as AntdTabsProps } from "antd";
import NoteList from "./noteList";
import DemoDualAxes from "./demodualAxes";
import classNames from "./styles/track.module.css";
import { getopAll } from "../../dashboard/api/index";
type TabItem = Required<AntdTabsProps>["items"][number];

const getTabItem = (prefix: string, label: string, children: React.ReactNode): TabItem => {
  const key = prefix + "-" + label;
  return {
    key,
    label,
    children,
  } as TabItem;
};

// Follow up:
// Finish the implementation of the other two tabs
const getTabItems = (prefix: string, tabs: Map<string, React.ReactNode>): TabItem[] => {
  const tabItems: TabItem[] = [];

  tabs.forEach((value, key) => {
    tabItems.push(getTabItem(prefix, key, value));
  });

  return tabItems;
};

export interface TabsProps {
  prefix: string;
  tabs: Map<string, React.ReactNode>;
}
export const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  const { prefix, tabs } = props;
  return <AntdTabs defaultActiveKey="1" items={getTabItems(prefix, tabs)} />;
};
