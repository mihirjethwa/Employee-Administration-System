import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input, message } from "antd";
import Store from "../../../Store";
import Layout from "antd/lib/layout/layout";
import "../../atools-services/list.scss";
import NationalityMasterdrawer from "../../common/drawer/AccessMaster";
import { getAccessRoutes } from "../../../redux/actions/AccessActions";
import { SetCurrentUser } from "../../../redux/actions/AuthActions";
import DocumentAccessMaster from "../../common/drawer/DocumentAccessMaster";
import "../master.scss";
import service from "../../../services/service";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Card, Skeleton, List, Tooltip } from "antd";
import ProfilePic from "../../../assets/list/profile.png";
import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import AccordianMain from "../utils/accordian";
import DeleteConfirmModal from "../utils/deleteConfirmModal";
import RBAC from "../../../utils/rbac";
function DocumentMasterNew(props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?: any;
  }
  useEffect(() => {
    // getRoleData()
    getAcessData();

  }, []);
  const [sort, Setsort] = useState("Start Date");
  const [editFlag, SeteditFlag] = useState(false);
  const [opsComplete, setopsComplete] = useState(false);
  const [editRecord, SetseditRecord] = useState();
  const [roles, SetRolesData] = useState([]);
  const [tableData, SettableData] = useState();
  const [count, Setcount] = useState(0);
  const [deletePopconfirm, SetdeletePopconfirm] = useState(false);
  const [deleteRecord, SetdeleteRecord] = useState<string>();
  const [DocumentAccessMasterd, setDocumentAccessMasterd] = useState(false);
  const [filteredInfo, SetfilteredInfo] = useState<Filter>({});
  const [sortedInfo, SetsortedInfo] = useState<Sort>({});
  const [drawer, setDrawer] = useState(false);
  //!           GETAcessData   start.........!//
  const userRoleId: string = useSelector((state: any) => state.auth.user.role._id);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getAcessData();
  //   dispatch(getAccessRoutes(userRoleId));
  // }, [opsComplete]);
  const getAcessData = () => {
    service.getData("/master/documentAccessMaster", isSuccess, isError);
    setopsComplete(false);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    SettableData(response.data.data);
    Setcount(response.data.data.length);

  };
  const isError = (error: any) => {
    console.log(error.message);

  };
  //!           GETAcessData   end.............!//
  // get role //
const getRoleData = () => {
    service.getData("/master/roleMaster", roleSuccess, roleError);
  };
  const roleSuccess = (response: any) => {
    console.log(response);
    var array = [];
    response.data.data.map((m) => array.push({_id:m._id,roleName:m.roleName}));
    SetRolesData(array);
  };
  const roleError = (error: any) => {
    console.log(error.message);
  };

// end of get role //
  //!           DELETEAcessData    start.........!//
  const handleDelete = (record) => {
    SetdeletePopconfirm(true);
    SetdeleteRecord(record._id);
  };
  const cancelDelete = () => {
    SetdeletePopconfirm(false);
    SetdeleteRecord(null);
  };
  const deleteSetConfirm = () => {
    service.deleteData(`/master/documentAccessMaster/${deleteRecord}`, deleteSuccess, deleteError);
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

  //!           DELETEAcessData   end.........!//
  //!           EDITAcessData   start.........!//
  const handleEdit = (record) => {
    SeteditFlag(true);
    console.log(record);

    SetseditRecord(record);
    setDocumentAccessMasterd(true);
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
    setDocumentAccessMasterd(true);
  };
  const drawerClose = () => {
    setDocumentAccessMasterd(false);
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
      title: "Document Group Name",
      dataIndex: "documentGroupName",
      key: "documentGroupName",
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record: any) => record.documentGroupName.toLowerCase().includes(value.toLowerCase()) || record.createdBy.userName.toLowerCase().includes(value.toLowerCase()),
      sorter: {
        compare: (a: any, b: any) => a.documentGroupName.length - b.documentGroupName.length,
        multiple: 2,
      },
      sortOrder: sortedInfo.columnKey === "documentGroupName" && sortedInfo.order,
    },
    // {
    //   title: "Access Given",
    //   dataIndex: "accessGiven",
    //   key: "accessGiven",
    //   render: (text, record, row) => {
    //     return {
    //       children: (
    //         <>
    //           <div className='Table_Tooltip' id='Table_Tooltip'>
    //             <Tooltip
    //               placement='right'
    //               color='#023047'
    //               title={
    //                 <>
    //                   <div className='Table_Tooltip'>
    //                     <p className='inter-body2-medium white'>Roles</p>
    //                     <ul>
    //                       {text.map((m: any) => (
    //                         <li key={m._id}>{m.roleName}</li>
    //                       ))}
    //                     </ul>
    //                   </div>
    //                 </>
    //               }
    //             >
    //               {text.length} Roles
    //             </Tooltip>
    //           </div>
    //         </>
    //       ),
    //     };
    //   },
    // },
    {
      title: "Documents List",
      dataIndex: "documents",
      key: "documents",
      render: (text, record, row) => {
        // var modulesList = makeModulesArray(text);

        return {
          children: (
            <>
             
                  <Tooltip
                  placement='right'
                  color='#023047'
                  title={
                    <>
                      <div className='Table_Tooltip'>
                        <p className='inter-body2-medium white'>Documents</p>
                        <ul>
                          {text.map((m: any) => (
                            <li key={m.documentName}><div className="d-flex justify-content-around"><p>{m.documentName}&nbsp;&nbsp;&nbsp;</p><p>{m.status === true ? "Active" : "Inactive"}</p></div></li>
                          ))}
                        </ul>
                      </div>
                    </>
                  }
                >
                  {text.length} Documents
                </Tooltip>

                    {/*
                     {text.map((tag) => (
                <Tag color='blue' key={tag.documentName}>
                  <div className='Table_Tooltip' id='Table_Tooltip'> <Tooltip
                      placement='right'
                      color='#023047'
                  
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
                    </Tooltip></div>
                </Tag> 
                ))}
                */}
                  
            
            </>
          ),
        };
      },
    },
    {
      title: "Status",
      dataIndex: "GroupStatus",
      key: "GroupStatus",
      render: (text: any, record, row) => {
        return {
          children: text === true ? "Active" : "Inactive",
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
                <h5 className='d-inline-flex align-items-center inter-headline1-bold'>{count} Document Group Listed</h5>
                <p className='inter-body2-regular text-center' style={{ opacity: 0.7 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
              <div className='d-inline-flex'>
                <Input placeholder='Type to search' className='mr-2 search-bar' allowClear style={{ height: 40 }} onChange={handleSearch} prefix={<SearchOutlined />} />
                <RBAC accessModules={["Edit_Master_Manager"]}>
                  <Button className='add-button mr-2 obutton' size='large' onClick={handleAdd}>
                    <PlusOutlined /> Add Document Group
                  </Button>
                </RBAC>
              </div>
            </Row>
            <Table dataSource={tableData} columns={columns} className='master-tables' onChange={handleChange} pagination={{ position: ["bottomLeft"] }} />
          </Col>
        </Row>
        <DocumentAccessMaster visible={DocumentAccessMasterd} drawerClose={drawerClose} data={editRecord} callback={handleCallback} editFlag={editFlag} />
      </Layout>
    </>
  );
}
export default DocumentMasterNew;
