import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Card, Divider, Upload, message } from "antd";
import React from "react";
import Down from "./Download1";
import Down2 from "./Download2";
import Down3 from "./Download3";

import { API_BASE_URL } from "../../../config";
import ApiList from "../../../config/apiList";
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
  <div style={{ alignItems: "center", marginTop: "20px" }}>
    <Card>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <Divider />
    </Card>
    <div style={{ marginTop: "20px" }}>
      <Card title="模板文件">
        <Card type="inner" title="日报表(模板)">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <Down />
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="收录表(模板)">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <Down2 />
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="关键词表(模板)">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
