import { InboxOutlined } from "@ant-design/icons";
import { Card, Divider, Upload, message, UploadProps } from "antd";
import React from "react";
import Down from "./download/download1";
import Down2 from "./download/download2";
import Down3 from "./download/download3";
import { API_BASE_URL } from "../../config";
import ApiList from "../../config/apiList";
import style from "./upload.module.css";

const { Dragger } = Upload;

const props: UploadProps = {
  accept: ".csv, .xls, .xlsx",
  name: "file",
  multiple: true,
  action: API_BASE_URL + ApiList.upload,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const UploadComp: React.FC = () => (
  <div className={style.upload}>
    <Card>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖动文件到此区域进行上传</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <Divider />
    </Card>
    <div className={style.download}>
      <Card title="模板文件">
        <Card className={style.card} type="inner" title="日报表(模板)">
          <div className={style.cardStyle}>
            <div>
              <Down />
            </div>
          </div>
        </Card>
        <Card className={style.card} type="inner" title="收录表(模板)">
          <div className={style.cardStyle}>
            <div>
              <Down2 />
            </div>
          </div>
        </Card>
        <Card className={style.card} type="inner" title="关键词表(模板)">
          <div className={style.cardStyle}>
            <div>
              <Down3 />
            </div>
          </div>
        </Card>
      </Card>
    </div>
  </div>
);

export default UploadComp;
