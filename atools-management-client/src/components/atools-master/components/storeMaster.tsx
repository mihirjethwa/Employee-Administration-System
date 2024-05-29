import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input, message } from "antd";
import Layout from "antd/lib/layout/layout";
import "../../atools-services/list.scss";
import "../master.scss";
import service from "../../../services/service";
import StoreMasterDrawer from "../../common/drawer/StoreMaster";
import { Tabs, Card, Skeleton, List } from "antd";
import ProfilePic from "../../../assets/list/profile.png";
import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import AccordianMain from "../utils/accordian";
import DeleteConfirmModal from "../utils/deleteConfirmModal";
import RBAC from "../../../utils/rbac";
function StoreMaster(props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?: any;
  }

  useEffect(() => {
    getStoreData();
  }, []);

  const [sort, Setsort] = useState("Start Date");
  const [editFlag, SeteditFlag] = useState(false);
  const [opsComplete, setopsComplete] = useState(false);
  const [editRecord, SetseditRecord] = useState();
  const [count, Setcount] = useState(0);
  const [deletePopconfirm, SetdeletePopconfirm] = useState(false);
  const [deleteRecord, SetdeleteRecord] = useState<string>();
  const [tableData, SettableData] = useState();
  const [StoreMasterd, setStoreMasterd] = useState(false);
  const [filteredInfo, SetfilteredInfo] = useState<Filter>({});
  const [sortedInfo, SetsortedInfo] = useState<Sort>({});
  const [drawer, setDrawer] = useState(false);

  //!          getStoreData   start.........!//
  useEffect(() => {
    getStoreData();
  }, [opsComplete]);
  const getStoreData = () => {
    service.getData("/master/storeMaster", isSuccess, isError);
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
  //!          getStoreData   end.............!//
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
    service.deleteData(`/master/storeMaster/${deleteRecord}`, deleteSuccess, deleteError);
  };
  const deleteSuccess = (response) => {
    console.log(response);
    setopsComplete(true);
    message.success("Record is successfully deleted");
    cancelDelete();
  };
  const deleteError = (error) => {
    console.log(error);
    message.error(error.message);
    cancelDelete();
  };

  //!           DELETEROLEDATA   end.........!//
  //!           EDITROLEDATA   start.........!//
  const handleEdit = (record) => {
    SeteditFlag(true);
    SetseditRecord(record);
    setStoreMasterd(true);
  };
  //!           EDITROLEDATA   end.........!//
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const handleSearch = (e: any) => {
    let name = e.target.value;
    SetfilteredInfo({ name: [name] });
  };
  const handleAdd = () => {
    setStoreMasterd(true);
  };
  const handleChange = (filters?: any, pagination?: any, sorter?: any) => {
    console.log("Various parameters", pagination, filters, sorter);
    SetfilteredInfo(filters);
    SetsortedInfo(sorter);
  };

  const handleView = () => {};

  const drawerClose = () => {
    setStoreMasterd(false);
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
  const columns = [
    {
      title: "Store Code",
      dataIndex: "storeCode",
      key: "storeCode",
      filteredValue: filteredInfo.name || null,
      onFilter: function (value: any, record: any) {
        return (
          record.storeName.toLowerCase().includes(value.toLowerCase()) ||
          record.storeLocation.toLowerCase().includes(value.toLowerCase()) ||
          (record.contactNumber && record.contactPerson.toLowerCase().includes(value.toLowerCase())) ||
          (record.contactNumber && record.contactNumber.toLowerCase().includes(value.toLowerCase())) ||
          (record.contactEmail && record.contactEmail.toLowerCase().includes(value.toLowerCase()))
        );
      },
      sorter: { compare: (a: any, b: any) => a.storeCode - b.storeCode, multiple: 2 },
      sortOrder: sortedInfo.columnKey === "storeCode" && sortedInfo.order,
    },
    {
      title: "Store Name",
      dataIndex: "storeName",
      key: "storeName",
      sorter: { compare: (a: any, b: any) => a.storeName.length - b.storeName.length },
      sortOrder: sortedInfo.columnKey === "storeName" && sortedInfo.order,
    },
    {
      title: "Location",
      dataIndex: "storeLocation",
      key: "storeLocation",
      sorter: { compare: (a: any, b: any) => a.storeLocation.length - b.storeLocation.length },
      sortOrder: sortedInfo.columnKey === "storeLocation" && sortedInfo.order,
    },
    {
      title: "Contact person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Email Address",
      dataIndex: "contactEmail",
      key: "contactEmail",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, row) => {
        return {
          children: (
            <RBAC accessModules={["Edit_Master_Manager"]}>
              <div className='d-flex' style={{ display: "flex", justifyContent: "flex-end" }}>
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
              <h5 className='d-inline-flex align-items-center inter-headline1-bold'>{count} Stores Listed</h5>

              <p className='inter-body2-regular text-center' style={{ opacity: 0.7 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </div>
            <div className='d-inline-flex'>
              <Input placeholder='Type to search' className='mr-2 search-bar' allowClear style={{ height: 48 }} onChange={handleSearch} prefix={<SearchOutlined />} />
              <RBAC accessModules={["Edit_Master_Manager"]}>
                <Button className='add-button mr-2 obutton' style={{ height: 48 }} size='large' onClick={handleAdd}>
                  <PlusOutlined /> Add Stores
                </Button>
              </RBAC>
            </div>
          </Row>

          <Table dataSource={tableData} columns={columns} className='master-tables' onChange={handleChange} pagination={{ position: ["bottomLeft"] }} />
        </Col>
      </Row>
      <StoreMasterDrawer visible={StoreMasterd} drawerClose={drawerClose} data={editRecord} callback={handleCallback} editFlag={editFlag} />
    </Layout>
  );
}
export default StoreMaster;
