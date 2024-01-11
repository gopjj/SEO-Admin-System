import React from "react";
import { Cascader } from "antd";

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "brand1",
    label: "好人家",
    children: [
      {
        value: "keyword1",
        label: "一人食晚餐",
      },
      {
        value: "keyword2",
        label: "番茄火锅",
      },
      {
        value: "keyword3",
        label: "番茄肥牛面",
      },
    ],
  },
  {
    value: "brand2",
    label: "依泉",
    children: [
      {
        value: "keyword1",
        label: "依泉特润霜",
      },
      {
        value: "keyword2",
        label: "干皮秋冬面",
      },
      {
        value: "keyword3",
        label: "干皮秋冬面霜",
      },
    ],
  },
];

const onChange = (value: any) => {
  console.log(value);
};

// Just show the latest item.
const displayRender = (labels: string[]) => labels[labels.length - 1];

export const Selectkeyword: React.FC = () => (
  <Cascader
    options={options}
    style={{ width: 120, marginLeft: "-10px", marginTop: "10px" }}
    expandTrigger="hover"
    displayRender={displayRender}
    onChange={onChange}
  />
);
