import { Card, Form, Select, Table } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import service from "../../../../services/service";
const { Option } = Select;

function EmployeeDocumentMain({ ...props }) {
  const [form] = Form.useForm();
  const [employeeId, setemployeeId] = useState(null);
  const [docdata, setdocdata] = useState(null);
  const [update, setUpdate] = useState(false);
  var localeData = require("dayjs/plugin/localeData");

  useEffect(() => {
    if (props.selectedEmployee) {
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
      getDocDetails(props.selectedEmployee._id);
    }
  }, [props.selectedEmployee]);
  //!           getData   start.........!//
  dayjs.extend(localeData);
  const getDocDetails = (employeeId) => {
    service.getData(`/employee/getEmployeeDocumentList/${employeeId}`, isSuccess, isError);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    var data = response.data.data[0];
    // data.DOB = dayjs(response.data.data[0].DOB);
    // form.setFieldsValue(data);
    setUpdate(true);
    setdocdata(response.data.data);
  };
  const isError = (error: any) => {
    console.log(error.message);
  };

  //!           getData   end.........!//
  const DateFormatter = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US");
  };

  const download = (file) => {
    service.getData(
      "/file-manager/download?s3Path=" + file.s3Path,
      function (data) {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([data.data]));
        link.download = file.fileName;
        link.click();
      },
      function () {},
      { responseType: "arraybuffer" }
    );
  };

  const columns = [
    {
      title: "Docuemnt Type",
      dataIndex: "documentName",
      key: "documentName",
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
      render: (text: any, record, row) => (
        <div style={{ cursor: "pointer" }} onClick={() => download(record)}>
          {text}
        </div>
      ),
    },
    {
      title: "Uploaded on",
      dataIndex: "uploadedOn",
      key: "uploadedOn",
      render: (text: any, record, row) => {
        return {
          children: text ? DateFormatter(text) : "",
        };
      },
    },
    {
      title: "Expiry",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text: any, record, row) => {
        return {
          children: text ? DateFormatter(text) : "",
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const columns1 = [
    {
      title: "Docuemnt Type",
      dataIndex: "documentName",
      key: "documentName",
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
      render: (text: any, record, row) => (
        <div style={{ cursor: "pointer" }} onClick={() => download(record)}>
          {text}
        </div>
      ),
    },
    {
      title: "Uploaded on",
      dataIndex: "uploadedOn",
      key: "uploadedOn",
      render: (text: any, record, row) => {
        return {
          children: text ? DateFormatter(text) : "",
        };
      },
    },
  ];
  return (
    <>
      <Card title='A. Right to Work & Job Documents'>
        <Table dataSource={docdata && [...docdata.right_to_work, ...docdata.additionalDoc] ? [...docdata.right_to_work, ...docdata.additionalDoc] : []} columns={columns} pagination={{ position: ["bottomLeft"] }} />
      </Card>
      <Card title='B. Contracts & Amendments'>
        <Table dataSource={docdata && docdata.contractDoc ? docdata.contractDoc : []} columns={columns1} pagination={{ position: ["bottomLeft"] }} />
      </Card>
      <Card title='C. Payroll Documents'>
        <Table dataSource={docdata && docdata.payroll ? docdata.payroll : []} columns={columns1} pagination={{ position: ["bottomLeft"] }} />
      </Card>
      <Card style={{ textAlign: "center" }}>
        Files can be downloaded by clicking on the filename above, or{" "}
        <a className='link' href='#'>
          click here
        </a>{" "}
        to download all files (zip).
      </Card>
      {/* <Card title="D. Additional Documents">
        <Table
          dataSource={docdata  && docdata.additionalDoc ? docdata.additionalDoc : []}
          columns={columns}
          pagination={{ position: ["bottomLeft"] }}
        />
      </Card> */}
    </>
  );
}
export default EmployeeDocumentMain;
