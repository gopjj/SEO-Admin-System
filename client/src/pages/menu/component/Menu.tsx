import { Menu as AntdMenu, MenuProps as AntdMenuProps} from "antd";
import { MenuConfig, MenuItemConfig } from "../../../config/menuConfig";
import { Link } from "react-router-dom";

type MenuItem = Required<AntdMenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function getMenuItems(userName: string) {
  const defaultItems = MenuConfig.default;
  const userItems = MenuConfig[userName] || [];
  const menuConfig = [...defaultItems, ...userItems];
  sortMenuItems(menuConfig);
  return parseMenuConfig(menuConfig);
}

function parseMenuConfig(menuItemsConfig: MenuItemConfig[]): MenuItem[] {
  return menuItemsConfig.map((item) =>
    getItem(
      item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
      item.label + "-" + item.path,
      item.icon ? <item.icon /> : undefined,
      item.children ? parseMenuConfig(item.children) : undefined
    )
  );
}

function sortMenuItems(items: MenuItemConfig[]): MenuItemConfig[] {
  return items
    .sort((a, b) => a.rank - b.rank)
    .map((item) => ({
      ...item,
      children: item.children ? sortMenuItems(item.children) : undefined,
    }));
}

interface MenuProps {
    userName: string
}

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const items = getMenuItems(props.userName);
console.log(props);
  return (
    <AntdMenu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
};
