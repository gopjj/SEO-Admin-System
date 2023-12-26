import { Divider } from "antd";
import { Card } from "antd/lib";
import React, { useEffect, useState } from "react";
import { getgmfData } from "../../dashboard/api/index";
import DataTable from "./data/datacard";
import SearchInput from "./search";
import style from "./styles/brand.module.css";
import { FloatButton, DatePicker, Select, Form, Modal, Input,InputNumber } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import { dateFormatterMap } from "@ant-design/pro-components";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import ApiList from "../../../config/apiList";
//接口定义
interface Values {
  date: any;
  keyword: string;
  noted: number;
}
//组件定义
interface InputFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
//组件实现
const handleChange = (value: string) => {
  console.log(`关键词选择Value ${value}`);
};

const dateFormat = 'YYYY-MM-DD';//  日期格式

const handleDateChange = (date: Dayjs |null, dateString: string) => { // 格式化日期并打印
  console.log("日期选择Value",dayjs(date).format(dateFormat));
};

const handleNotedChange = (value: any) => {
    console.log('上榜笔记数量Value', value);
  };


const InputForm: React.FC<InputFormProps> = ({ open, onCreate, onCancel }) => { //
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="更新每日上榜笔记数据"
      okText="提交"
      cancelText="清除"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="keyword"
          label="关键词"
          rules={[{ required: true, message: "请输入好人家笔记关键词!" }]}
        >
          <Select
            defaultValue="选择关键词"
            style={{ width: 470 }}
            onChange={handleChange}
            options={[
              { value: "好人家", label: "好人家" },
              { value: "番茄做法", label: "番茄做法" },
              { value: "番茄汤", label: "番茄汤" },
              { value: "番茄火锅", label: "番茄火锅" },
              { value: "番茄肥牛面", label: "番茄肥牛面" },
              { value: "低卡减值餐", label: "低卡减值餐" },
              { value: "一人食晚餐", label: "一人食晚餐" },
              // { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="日期"
          rules={[{ required: true, message: "请输入更新数据日期!" }]}
        >
           <DatePicker style={{ width: 470 }} format={dateFormat} onChange={handleDateChange} />
         
        </Form.Item>

        <Form.Item
          name="noted"
          label="上榜笔记数量："
          rules={[{ required: true, message: "请输入上榜笔记数量!" }]}
        >
      <InputNumber   style={{ width: 470 }} min={1} max={100000} defaultValue={3} onChange={handleNotedChange} />
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

const App: React.FC = () => {
  const [open, setopen] = useState(false);
  const [inputValue, setInputValue] = useState(1);

  // const response = await axios.post(API_BASE_URL + ApiList.postData,params, {
  //   headers: {
  //     Authorization: "TestFooDigital",
  //     "Content-Type": "application/json",
  //   },
  // });
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onCreate = async(values: any) => {
    const params:Values ={
      keyword:values.keyword,
      date:dayjs(values.date).format(dateFormat),
      noted:values.noted,
  };
    console.log("values", values);
    
    setopen(false);
    try {
      const response = await axios.post(API_BASE_URL + ApiList.postData, params, {
        headers: {
          Authorization: "TestFooDigital",
          "Content-Type": "application/json",
        },
      });
      // console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const [pageWidth, setPageWidth] = useState(
    window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(
        window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Divider orientation="left" plain className={style.divder}>
        好人家 详情页
      </Divider>

      <Card className={style.cardChart}>
        <div className="search-input-wrapper">
     
        </div>
      </Card>

      <Card
        title="好人家Top12汇总达成率"
        bordered={false}
        className={style.cardSearch1}
      >
        <div>
          <DataTable getListFunction={getgmfData} />
        </div>
        <FloatButton
          onClick={() => {
            setopen(true);
          }}
          shape="circle"
          badge={{ dot: true }}
          style={{ right: 0 + 0 + 48 }}
        />
        <InputForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setopen(false);
          }}
        />
      </Card>
    </>
  );
};

export default App;
