import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input } from "antd";
import Layout from "antd/lib/layout/layout";
import "../../atools-services/list.scss";
import "../master.scss";
import service from "../../../services/service";
import { Tabs, Card, Skeleton, List, message } from "antd";
import ProfilePic from "../../../assets/list/profile.png";
import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import AccordianMain from "../utils/accordian";
import HolidayMasterDrawer from "../../common/drawer/HolidayMaster";
import DeleteConfirmModal from "../utils/deleteConfirmModal";
import RBAC from "../../../utils/rbac";
function HolidayLogMaster(props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?: any;
  }

  useEffect(() => {
    getHolidayData();
  }, []);
  const [sort, Setsort] = useState("Start Date");
  const [editFlag, SeteditFlag] = useState(false);
  const [opsComplete, setopsComplete] = useState(false);
  const [editRecord, SetseditRecord] = useState();
  const [count, Setcount] = useState(0);
  const [deletePopconfirm, SetdeletePopconfirm] = useState(false);
  const [deleteRecord, SetdeleteRecord] = useState<string>();
  const [tableData, SettableData] = useState();
  const [HolidayMasterd, setHolidayMasterd] = useState(false);
  const [filteredInfo, SetfilteredInfo] = useState<Filter>({});
  const [sortedInfo, SetsortedInfo] = useState<Sort>({});
  const [drawer, setDrawer] = useState(false);

  //!           getHolidayData   start.........!//
  useEffect(() => {
    getHolidayData();
  }, [opsComplete]);
  const getHolidayData = () => {
    service.getData("/master/holidayMaster", isSuccess, isError);
    setopsComplete(false);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    SettableData(response.data.data);
    Setcount(response.data.data.length);
    // setSuccess(true);
    // setSuccessMessage(response.data.data)
  };
  const isError = (error: any) => {
    console.log(error.message);
    // setErrorMessage(error.message)
    // setIsError(true)
  };
  //!           getHolidayData   end.............!//
  //!           DELETEROLEDATA   start.........!//
  const handleDelete = (record) => {
    SetdeletePopconfirm(true);
    SetdeleteRecord(record._id);
  };
  const cancelDelete = () => {
    SetdeletePopconfirm(false);
    SetdeleteRecord(null);
  };
  const deleteSetConfirm = () => {
    service.deleteData(`/master/holidayMaster/${deleteRecord}`, deleteSuccess, deleteError);
  };
  const deleteSuccess = (response) => {
    console.log(response);
    setopsComplete(true);
    message.success("Record is successfully deleted");
    cancelDelete();
  };
  const deleteError = (error) => {
    console.log(error);
    message.error("Record could not be deleted, please try again");
  };

  //!           DELETEROLEDATA   end.........!//
  //!           EDITROLEDATA   start.........!//
  const handleEdit = (record) => {
    SeteditFlag(true);
    SetseditRecord(record);
    setHolidayMasterd(true);
  };
  //!           EDITROLEDATA   end.........!//

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
  const handleAdd = () => {
    setHolidayMasterd(true);
  };
  const DateFormatter = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US");
  };
  const handleView = () => {};

  const drawerClose = () => {
    setHolidayMasterd(false);
    SeteditFlag(false);
  };

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
      case "OpsComplete":
        setopsComplete(true);
        drawerClose();

        break;
    }
  };
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const getMonth = (date) => {
    const newdate = new Date(date);
    return months[newdate.getMonth()];
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "holidayDate",
      key: "date",
      sorter: {
        compare: (a: any, b: any) => Date.parse(a.holidayDate) - Date.parse(b.holidayDate),
        multiple: 1,
      },
      sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
      render: (text: any, record, row) => {
        return {
          children: DateFormatter(text),
        };
      },
    },
    {
      title: "Month",
      dataIndex: "holidayDate",
      key: "holidayDate",
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record: any) => record.holidayReason.toLowerCase().includes(value.toLowerCase()) || record.createdBy.userName.toLowerCase().includes(value.toLowerCase()) || getMonth(record.holidayDate).includes(value.toLowerCase()),
      sorter: {
        compare: (a: any, b: any) => Date.parse(a.holidayDate) - Date.parse(b.holidayDate),
        multiple: 2,
      },
      sortOrder: sortedInfo.columnKey === "holidayDate" && sortedInfo.order,
      render: (text: any, record, row) => {
        const newdate = new Date(text);
        return {
          children: months[newdate.getMonth()],
        };
      },
    },
    {
      title: "Reason",
      dataIndex: "holidayReason",
      key: "holidayReason",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "dateCreated",
      render: (text: any, record, row) => {
        return {
          children: DateFormatter(text),
        };
      },
      //   sorter:{compare: (a:any, b:any) => Date.parse(a.dateCreated) - Date.parse(b.dateCreated), multiple: 1},
      // sortOrder: sortedInfo.columnKey === 'start_date' && sortedInfo.order,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text: any, record, row) => {
        return {
          children: <div>{text?.firstName + " " + text?.lastName}</div>,
        };
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, row) => {
        return {
          children: (
            <RBAC accessModules={["Edit_Master_Manager"]}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button className='action-buttons' shape='circle' size='middle' icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
                {/* <Button className='action-buttons ml-2' shape='circle' size='middle' icon={<EyeOutlined />} onClick={() => handleView}></Button> */}
                <Button className='action-buttons ml-2 del' shape='circle' size='middle' icon={<DeleteOutlined />} onClick={() => handleDelete(record)}></Button>
              </div>
            </RBAC>
          ),
        };
      },
    },
  ];

  return (
    <Layout>
      <DeleteConfirmModal deletePopconfirm={deletePopconfirm} cancelDelete={cancelDelete} deleteSetConfirm={deleteSetConfirm} />
      <Row gutter={[24, 24]} style={{ marginTop: 72 }} className='mx-0'>
        <Col xxl={{ span: 5, offset: 2 }} lg={{ span: 5, offset: 1 }}>
          <AccordianMain />
        </Col>
        <Col xxl={{ span: 15 }} lg={{ span: 17 }} className='mt-3 white-bg px-0 py-3'>
          <Row className='mx-0 px-3' justify='space-between' style={{ marginBottom: 16, zIndex: 101 }}>
            <div>
              <h5 className='d-inline-flex align-items-center inter-headline1-bold'>{count} Holidays Listed</h5>

              <p className='inter-body2-regular text-center' style={{ opacity: 0.7 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </div>
            <div className='d-inline-flex'>
              <Input placeholder='Type to search' className='mr-2 search-bar' allowClear style={{ height: 48 }} onChange={handleSearch} prefix={<SearchOutlined />} />
              <RBAC accessModules={["Edit_Master_Manager"]}>
                <Button className='add-button mr-2 obutton' size='large' style={{ height: 48 }} onClick={handleAdd}>
                  <PlusOutlined /> Add Holiday
                </Button>
              </RBAC>
            </div>
          </Row>

          <Table dataSource={tableData} className='master-tables' columns={columns} onChange={handleChange} pagination={{ position: ["bottomLeft"] }} />
        </Col>
      </Row>
      <HolidayMasterDrawer visible={HolidayMasterd} drawerClose={drawerClose} data={editRecord} callback={handleCallback} editFlag={editFlag} />
    </Layout>
  );
}
export default HolidayLogMaster;
