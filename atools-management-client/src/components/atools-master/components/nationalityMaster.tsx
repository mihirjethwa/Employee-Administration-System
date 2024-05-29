import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input, message } from "antd";
import Store from "../../../Store";
import Layout from "antd/lib/layout/layout";
import "../../atools-services/list.scss";
import NationalityMasterdrawer from "../../common/drawer/AccessMaster";
import { getAccessRoutes } from "../../../redux/actions/AccessActions";
import { SetCurrentUser } from "../../../redux/actions/AuthActions";
import NationalityDocDrawer from "../../common/drawer/NationalityDocMaster";
import "../master.scss";
import service from "../../../services/service";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Card, Skeleton, List, Tooltip } from "antd";
import ProfilePic from "../../../assets/list/profile.png";
import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import AccordianMain from "../utils/accordian";
import DeleteConfirmModal from "../utils/deleteConfirmModal";
import RBAC from "../../../utils/rbac";
function NationalityMaster(props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?: any;
  }
  useEffect(() => {
    getAcessData();
  }, []);
  const [sort, Setsort] = useState("Start Date");
  const [editFlag, SeteditFlag] = useState(false);
  const [opsComplete, setopsComplete] = useState(false);
  const [editRecord, SetseditRecord] = useState();
  const [tableData, SettableData] = useState();
  const [count, Setcount] = useState(0);
  const [deletePopconfirm, SetdeletePopconfirm] = useState(false);
  const [deleteRecord, SetdeleteRecord] = useState<string>();
  const [NationalityMasterd, setNationalityMasterd] = useState(false);
  const [filteredInfo, SetfilteredInfo] = useState<Filter>({});
  const [sortedInfo, SetsortedInfo] = useState<Sort>({});
  const [drawer, setDrawer] = useState(false);
  //!           GETAcessData   start.........!//
  const userRoleId: string = useSelector((state: any) => state.auth.user.role._id);
  const dispatch = useDispatch();
  useEffect(() => {
    getAcessData();
    dispatch(getAccessRoutes(userRoleId));
  }, [opsComplete]);
  const getAcessData = () => {
    service.getData("/master/nationalityMaster", isSuccess, isError);
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
  //!           GETAcessData   end.............!//
  //!           DELETEAcessData   start.........!//
  const handleDelete = (record) => {
    SetdeletePopconfirm(true);
    SetdeleteRecord(record._id);
  };
  const cancelDelete = () => {
    SetdeletePopconfirm(false);
    SetdeleteRecord(null);
  };
  const deleteSetConfirm = () => {
    service.deleteData(`/master/nationalityMaster/${deleteRecord}`, deleteSuccess, deleteError);
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

  //!           DELETEAcessData   end.........!//
  //!           EDITAcessData   start.........!//
  const handleEdit = (record) => {
    SeteditFlag(true);
    console.log(record);

    SetseditRecord(record);
    setNationalityMasterd(true);
  };
  //!           EDITAcessData   end.........!//
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const handleSearch = (e: any) => {
    let name = e.target.value;
    SetfilteredInfo({ name: [name] });
  };
  const makeModulesArray = (data) => {
    var obj = new Array();
    if (data) {
      console.log(data);

      data.map((k) => {
        obj.push(k.label);
      });
    }
    return obj;
  };
  const handleChange = (filters?: any, pagination?: any, sorter?: any) => {
    console.log("Various parameters", pagination, filters, sorter);
    SetfilteredInfo(filters);
    SetsortedInfo(sorter);
  };
  const DateFormatter = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US");
  };
  const handleView = () => {};
  const handleAdd = () => {
    setNationalityMasterd(true);
  };
  const drawerClose = () => {
    setNationalityMasterd(false);
    SeteditFlag(false);
    SetseditRecord(null);
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
  const dataSource = [
    {
      role_name: "Admin",
      key: "1",
      mods_documentible: ["Module 1 Name", "Module 2 Name", "Module 3 Name"],
      dateCreated: "05/03/2010",
      createdBy: "username",
    },
    {
      role_name: "Sub-Admin",
      key: "2",
      mods_documentible: ["Module 1 Name", "Module 2 Name", "Module 3 Name"],
      dateCreated: "05/03/2010",
      createdBy: "username",
    },
    {
      role_name: "Supervisor",
      key: "3",
      mods_documentible: ["Module 1 Name", "Module 2 Name", "Module 3 Name"],
      dateCreated: "05/03/2010",
      createdBy: "username",
    },
  ];
  const columns = [
    {
      title: "Nationality",
      dataIndex: "nationalityName",
      key: "nationality",
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record: any) => record.nationalityName.toLowerCase().includes(value.toLowerCase()) || record.createdBy.userName.toLowerCase().includes(value.toLowerCase()),
      sorter: {
        compare: (a: any, b: any) => a.nationalityName.length - b.nationalityName.length,
        multiple: 2,
      },
      sortOrder: sortedInfo.columnKey === "nationalityName" && sortedInfo.order,
    },
    {
      title: "Sub Locations",
      dataIndex: "subLocation",
      key: "subLocation",
      render: (text, record, row) => {
        return {
          children: (
            <>
              <div className='Table_Tooltip' id='Table_Tooltip'>
                <Tooltip
                  placement='right'
                  color='#023047'
                  //    getTooltipContainer = {() => document.getElementById("Table_Tooltip")}
                  title={
                    <>
                      <div className='Table_Tooltip'>
                        <p className='inter-body2-medium white'>Country Names</p>
                        <ul>
                          {text.map((m: any) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  }
                >
                  {text.length} Sub-locations
                </Tooltip>
              </div>
            </>
          ),
        };
      },
    },
    {
      title: "Document Groups",
      dataIndex: "documentGroups",
      key: "documentGroups",
      render: (text, record, row) => {
        var modulesList = makeModulesArray(text);

        return {
          children: (
            <>
              {modulesList.map((tag) => (
                <Tag color='blue' key={tag}>
                  <div className='Table_Tooltip' id='Table_Tooltip'>
                    <Tooltip
                      placement='right'
                      color='#023047'
                      //    getTooltipContainer = {() => document.getElementById("Table_Tooltip")}
                      title={
                        <>
                          <div className='Table_Tooltip'>
                            <p className='inter-body2-medium white'>Document List</p>
                            <ul>
                              {record.documentGroups
                                .find((t) => t.label == tag)
                                .DocGroup.map((m: any) => (
                                  <li key={m.label}>{m.label}</li>
                                ))}
                            </ul>
                          </div>
                        </>
                      }
                    >
                      {tag}
                    </Tooltip>
                  </div>
                </Tag>
              ))}
            </>
          ),
        };
      },
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
              <div className='d-flex' style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button className='action-buttons' shape='circle' size='middle' icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
                <Button className='action-buttons ml-2 del' shape='circle' size='middle' icon={<DeleteOutlined />} onClick={() => handleDelete(record)}></Button>
              </div>
            </RBAC>
          ),
        };
      },
    },
  ];

  return (
    <>
      <Layout>
        <DeleteConfirmModal deletePopconfirm={deletePopconfirm} cancelDelete={cancelDelete} deleteSetConfirm={deleteSetConfirm} />
        <Row gutter={[24, 24]} style={{ marginTop: 72 }} className='mx-0'>
          <Col xxl={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 1 }}>
            <AccordianMain />
          </Col>
          <Col xxl={{ span: 14 }} lg={{ span: 16 }} className='mt-3 white-bg px-0 py-3'>
            <Row className='mx-0 px-3' justify='space-between' style={{ marginBottom: 16, zIndex: 101 }}>
              <div>
                <h5 className='d-inline-flex align-items-center inter-headline1-bold'>{count} Nationality Manager Listed</h5>
                <p className='inter-body2-regular text-center' style={{ opacity: 0.7 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
              </div>
              <div className='d-inline-flex'>
                <Input placeholder='Type to search' className='mr-2 search-bar' allowClear style={{ height: 40 }} onChange={handleSearch} prefix={<SearchOutlined />} />
                <RBAC accessModules={["Edit_Master_Manager"]}>
                  <Button className='add-button mr-2 obutton' size='large' onClick={handleAdd}>
                    <PlusOutlined /> Add Nationality Manager
                  </Button>
                </RBAC>
              </div>
            </Row>
            <Table dataSource={tableData} columns={columns} className='master-tables' onChange={handleChange} pagination={{ position: ["bottomLeft"] }} />
          </Col>
        </Row>
        <NationalityDocDrawer visible={NationalityMasterd} drawerClose={drawerClose} data={editRecord} callback={handleCallback} editFlag={editFlag} />
      </Layout>
    </>
  );
}
export default NationalityMaster;
