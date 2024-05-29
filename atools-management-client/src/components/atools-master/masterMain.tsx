import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import * as React from "react";
import { useState } from "react";
import "../atools-services/list.scss";
import "./master.scss";
import AccordianMain from "./utils/accordian";

function MasterMain(props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?: any;
  }

  const [sort, Setsort] = useState("Start Date");
  const [filteredInfo, SetfilteredInfo] = useState<Filter>({});
  const [sortedInfo, SetsortedInfo] = useState<Sort>({});
  const [drawer, setDrawer] = useState(false);
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const handleSearch = (e: any) => {
    let name = e.target.value;
    SetfilteredInfo({ name: [name] });
  };
  const handleChange = (filters?: any, pagination?: any, sorter?: any) => {
    console.log("Various parameters", pagination, filters, sorter);
    SetfilteredInfo(filters);
    SetsortedInfo(sorter);
  };
  const handleEdit = () => {};
  const handleView = () => {};
  const handleDelete = () => {};

  const handleCallback = (childata: any, step = "default") => {
    switch (step) {
      case "Sort":
        Setsort(childata);
        switch (childata) {
          case "Start Date":
            SetsortedInfo({ columnKey: "start_date", order: "ascend" });

            break;
          case "Last name":
            SetsortedInfo({ columnKey: "lastname", order: "ascend" });
            break;
        }

        break;
    }
  };
  const dataSource = [
    {
      locationCode: 245240,
      key: "1",
      state: "North West, England",
      city: "Chester",
      dateCreated: "05/03/2010",
      createdBy: "username",
    },
    {
      locationCode: 245240,
      key: "2",
      state: "North West, England",
      city: "Chester",
      dateCreated: "05/03/2010",
      createdBy: "username",
    },
  ];
  const columns = [
    {
      title: "Location Code",
      dataIndex: "locationCode",
      key: "locationCode",
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value: any, record:any) => record.lastname.includes(value) || record.firstname.includes(value),
      // sorter:{compare: (a:any, b:any) => a.lastname.length - b.lastname.length, multiple: 2,},
      // sortOrder: sortedInfo.columnKey === 'lastname' && sortedInfo.order,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      //   sorter:{compare: (a:any, b:any) => Date.parse(a.dateCreated) - Date.parse(b.dateCreated), multiple: 1},
      // sortOrder: sortedInfo.columnKey === 'start_date' && sortedInfo.order,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => {
        return {
          children: (
            <div className='d-flex'>
              <Button className='action-buttons' shape='circle' size='middle' icon={<EditOutlined />} onClick={() => handleEdit}></Button>
              {/* <Button className='action-buttons ml-2' shape='circle' size='middle' icon={<EyeOutlined />} onClick={() => handleView}></Button> */}
              <Button className='action-buttons ml-2' shape='circle' size='middle' icon={<DeleteOutlined />} onClick={() => handleDelete}></Button>
            </div>
          ),
        };
      },
    },
  ];

  return (
    <Layout>
      <Row gutter={[24, 24]} style={{ marginTop: 72 }} className='mx-0'>
        <Col xxl={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 1 }}>
          <AccordianMain />
        </Col>
        <Col xxl={{ span: 14 }} lg={{ span: 16 }} className='mt-3 white-bg px-0 py-3'>
          <Row className='mx-0 px-3' justify='space-between' style={{ marginBottom: 16, zIndex: 101 }}>
            <div>
              <h5 className='d-inline-flex align-items-center inter-headline1-bold'>120 Influencers found</h5>

              <p className='inter-body2-regular text-center' style={{ opacity: 0.7 }}>
                Here are 12 influencers that match your search
              </p>
            </div>
            <div className='d-inline-flex'>
              <Input placeholder='Type to search' className='mr-2' allowClear style={{ height: 60 }} onChange={handleSearch} />
            </div>
          </Row>

          <Table dataSource={dataSource} columns={columns} onChange={handleChange} pagination={{ position: ["bottomLeft"] }} />
        </Col>
      </Row>
    </Layout>
  );
}
export default MasterMain;
