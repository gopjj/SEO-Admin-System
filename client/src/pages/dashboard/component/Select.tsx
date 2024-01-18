import React from "react";
import { Cascader } from "antd";
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "好人家",
    label: "好人家",
    children: [
      {
        value: "一人食晚餐",
        label: "一人食晚餐",
      },
      {
        value: "番茄火锅",
        label: "番茄火锅",
      },
      {
        value: "番茄肥牛面",
        label: "番茄肥牛面",
      },
      {
        value: "番茄做法",
        label: "番茄做法",
      },
      {
        value: "低卡减脂餐",
        label: "低卡减脂餐",
      },
      {
        value: "番茄汤",
        label: "番茄汤",
      },
      {
        value: "好人家",
        label: "好人家",
      },
    ],
  },
  {
    value: "依泉",
    label: "依泉",
    children: [
      {
        value: "依泉特润霜",
        label: "依泉特润霜",
      },
      {
        value: "干皮秋冬面",
        label: "干皮秋冬面",
      },
      {
        value: "干皮秋冬面霜",
        label: "干皮秋冬面霜",
      },
    ],
  },
];
const onChange = (value: any) => {
  console.log(value);
};
// const displayRender = (labels: string[]) => labels[labels.length - 1];

export const Selectkeyword: React.FC<{ onSelect: (brnad: string,key:string) => void }> = ({ onSelect }) => {
  const onChange = (value: any) => {
    const brand = value?.[0] || null;
    const key = value?.[1] || null;
    onSelect(brand, key);
  };
  
  return (
  <Cascader
    options={options}
    style={{ width: 160, marginLeft: "-10px", marginTop: "10px" }}
    expandTrigger="hover"
    // displayRender={displayRender}
    onChange={onChange}
    changeOnSelect 
  />
);
  };