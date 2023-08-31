import { Breadcrumb } from "antd";

const Option1: React.FC = () => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>Option1</Breadcrumb.Item>
      <Breadcrumb.Item>Option1 - 1</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export default Option1;
