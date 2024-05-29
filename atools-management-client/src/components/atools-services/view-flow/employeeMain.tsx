import { DownloadOutlined, ExclamationCircleFilled, FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Radio, Result, Row, Select, Tabs } from "antd";
import Layout from "antd/lib/layout/layout";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import service from "../../../services/service";
import RBAC from "../../../utils/rbac";
import ExportModal from "../../common/modal/ExportModal";
import "../list.scss";
import SearchPanel from "../utils/searchPanel";
import "./employeeMain.scss";
import EmployeeTabs from "./employeeTabs";

const { Option } = Select;
const { TabPane } = Tabs;

/**
 * Employee view main page
 */
function EmployeeMain(props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?: any;
  }

  const [status, Setstatus] = useState("Current");
  const [sort, Setsort] = useState("Start Date");
  const [filteredInfo, SetfilteredInfo] = useState<Filter>({});
  const [sortedInfo, SetsortedInfo] = useState<Sort>({});
  const [selectedEmployee, setselectedEmployee] = useState(null);
  const [roles, SetRolesData] = useState([]);
  const [stores, SetStoresData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [storeSelected, setStoreSelected] = useState("");
  const [roleSelected, setRoleSelected] = useState("");
  const [draftComplete, setdraftComplete] = useState(false);
  const [search, setSearch] = useState("");
  const [downloadData, setDownloadData] = useState(null);
  const [exportVisible, setExportVisible] = useState(false);

  let history = useHistory();

  //* *               UseEffects  start         **//

  useEffect(() => {
    getRoleData();
    getStoreData();
    getEmployeeData(search, page, limit, storeSelected, roleSelected, status);
  }, []);
  useEffect(() => {
    getEmployeeData(search, page, limit, storeSelected, roleSelected, status);
  }, [search, storeSelected, roleSelected, status]);

  //* *               UseEffects  end         **//
  //!           GetRole data   start.........!//
  const getRoleData = () => {
    service.getData("/master/roleMaster", roleSuccess, roleError);
  };

  const roleSuccess = (response: any) => {
    console.log(response);
    SetRolesData(response.data.data);
  };
  const roleError = (error: any) => {
    console.log(error.message);
  };
  //!           GetRole data   start.........!//
  //!           GetStore data   start.........!//
  const getStoreData = () => {
    service.getData("/master/storeMaster", storeSuccess, storeError);
  };

  const storeSuccess = (response: any) => {
    SetStoresData(response.data.data);
  };
  const storeError = (error: any) => {
    console.log(error.message);
  };
  //!           GetStore data   start.........!//
  //+             Filter Functions start              +//
  const onStoreChange = (value) => {
    console.log(value);
    setStoreSelected(value);
  };
  const onRoleChange = (value) => {
    console.log(value);
    setRoleSelected(value);
  };

  const getEmployeeData = (name, page, limit, storeSelected, roleSelected, status) => {
    service.getData(`/search/?query=${name}&page=${page}&limit=${limit}&store=${storeSelected}&role=${roleSelected}&empStatus=${status}`, employeeSuccess, employeeError);
  };

  const employeeSuccess = (response: any) => {
    // console.log(response.data.data);
    setEmployee(response.data.data.data);
    setCount(response.data.data.count[0].count);
  };
  const employeeError = (error: any) => {
    console.log(error.message);
  };

  const handleSearch = (e: any) => {
    let name = e.target.value;
    // getEmployeeData(name);
    setSearch(name);
    SetfilteredInfo({ name: [name] });
  };
  const handleStatusChange = (e: any) => {
    Setstatus(e.target.value);
  };
  //+             draft modal start              +//
  const cancelDelete = () => {
    setdraftComplete(false);
  };
  const pageMap = { 1: "general-details", 2: "payroll-details", 3: "right-to-work", 4: "additional-documents", 5: "summary" };
  const completeForm = () => {
    var page = pageMap[parseInt(selectedEmployee.pageStatus) + 1];
    console.log(page, parseInt(selectedEmployee.pageStatus));

    history.push({
      pathname: `./addEmployee/${page}`,
      state: {
        employeeId: selectedEmployee._id,
        role: selectedEmployee.role._id,
        putFlag: false,
      },
    });
  };
  //+             draft modal end              +//
  //+             Filter Functions start              +//
  const handleChange = (filters?: any, pagination?: any, sorter?: any) => {
    console.log("Various parameters", pagination, filters, sorter);
    SetfilteredInfo(filters);
    SetsortedInfo(sorter);
  };
  const handleEdit = () => { };
  const handleView = () => { };
  const handleCallback = (childata: any, step = "default") => {
    switch (step) {
      case "SelectedEmployee":
        setselectedEmployee(childata);
        if (!childata.formCompleted) {
          setdraftComplete(true);
        }
        break;
      case "changeData":
        getEmployeeData(search, childata, limit, storeSelected, roleSelected, status);
        break;
    }
  };

  const modalClose = () => {
    setExportVisible(false);
  };

  const getDownloadData = () => {
    setExportVisible(true);
    // window.open(`${service.baseURL}/export/excel/employee-basic-info`);
  };

  return (
    <Layout style={{ marginTop: 72 }}>
      <Row className='bg-grey filter-panel'>
        <Col xxl={{ span: 20, offset: 2 }} lg={{ span: 20, offset: 2 }}>
          <Row className='my-3'>
            <p className='inter-label-bold text-uppercase white mb-0'>Services &gt; Employee Manager</p>
          </Row>
          <Row>
            <Col xxl={{ span: 24 }} lg={{ span: 24 }} className='d-flex justify-content-between'>
              <div>
                <h5 className='d-inline-flex align-items-center inter-headline1-bold white mb-1'>View Employees</h5>

                <p className='inter-body2-regular text-center white' style={{ opacity: 0.7 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                </p>
              </div>
              <div className='d-flex align-items-center'>
                <Button className='export-button obutton' size='large' onClick={getDownloadData}>
                  <DownloadOutlined /> Export Details
                </Button>
                <RBAC accessModules={["Edit_Employee_Manager"]}>
                  <Link
                    to={{
                      pathname: "./addEmployee/store-and-title",
                    }}
                  >
                    <Button className='add-button ml-2 obutton' size='large'>
                      <PlusOutlined /> Add Employee
                    </Button>
                  </Link>
                </RBAC>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xxl={{ span: 24 }} lg={{ span: 24 }} className='d-flex justify-content-between my-3'>
              <div>
                <Select showSearch style={{ width: 200 }} placeholder='Select Store' size='large' onChange={onStoreChange}>
                  <Option key='' value=''>
                    Select Store
                  </Option>
                  {stores.map((option: any) => (
                    <Option key={option._id} value={option._id}>
                      {option.storeName}
                    </Option>
                  ))}
                </Select>

                <Select showSearch style={{ width: 200 }} placeholder='Select Job Role' className='ml-2' onChange={onRoleChange} size='large'>
                  <Option key='' value=''>
                    Select Job Role
                  </Option>
                  {roles.map((option: any) => (
                    <Option key={option._id} value={option._id}>
                      {option.roleName}
                    </Option>
                  ))}
                </Select>
                <Radio.Group value={status} onChange={handleStatusChange} size='large' buttonStyle='solid' className='ml-2 filter-radio '>
                  <Radio.Button value='Current'>Current</Radio.Button>
                  <Radio.Button value='Leaver'>Leaver</Radio.Button>
                  <Radio.Button value='Deleted'>Deleted</Radio.Button>
                </Radio.Group>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='mx-0'>
        <Col xxl={{ span: 5, offset: 2 }} lg={{ span: 5, offset: 2 }} className='mt-3' style={{ marginRight: 12 }}>
          <Row className='mx-0' justify='space-between' style={{ marginBottom: 16, zIndex: 101 }}>
            <div className='d-inline-flex w-100'>
              <Input placeholder='Search Employee' className='mr-2' allowClear style={{ height: 45, border: "none" }} onChange={(e) => handleSearch(e)} prefix={<SearchOutlined style={{ marginRight: 5, color: "#ACACAC" }} />} />
              <Button className='filter-button' size='large' style={{ height: 45 }}>
                <FilterOutlined className='ml-0' />
              </Button>
            </div>
          </Row>
          <Row>
            <SearchPanel totalElements={employee} handleCallback={handleCallback} count={count} />
          </Row>
        </Col>
        <Col xxl={{ span: 15 }} lg={{ span: 15 }} className='mt-3' id='employee-tabs'>
          {props.selectedEmployee || selectedEmployee?.formCompleted ? <EmployeeTabs selectedEmployee={selectedEmployee} /> : <Result status='404' title='No employee selected' subTitle='Please select any employee' />}
        </Col>
      </Row>
      <Modal footer={null} centered visible={draftComplete} closable={true} maskClosable={true} onCancel={() => cancelDelete()} className='delete-modal' zIndex={99} width={350} getContainer='#employee-tabs'>
        <div className='text-center'>
          <p className='inter-headline1-bold text-center mb-2' style={{ fontFamily: "Inter" }}>
            <ExclamationCircleFilled style={{ fontSize: 50 }} />
          </p>

          <p className='inter-body1-regular text-center mb-3' style={{ fontFamily: "Inter" }}>
            This employee profile is incomplete, please complete the profile.
          </p>

          <div className='d-flex flex-column justify-content-center'>
            <Button type='primary' className='delete-buttons w-100' size='large' onClick={() => completeForm()}>
              Continue
            </Button>
            <Button type='link' onClick={() => cancelDelete()}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <ExportModal visible={exportVisible} modalClose={modalClose} />
    </Layout>
  );
}
export default EmployeeMain;
