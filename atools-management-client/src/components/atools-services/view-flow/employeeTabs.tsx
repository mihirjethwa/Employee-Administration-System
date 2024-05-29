import { CaretDownFilled } from "@ant-design/icons";
import { Dropdown, Menu, Select, Tabs } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import "../list.scss";
import "./employeeMain.scss";
import EmplyeeContractMain from "./main-components/employeeContractMain";
import EmployeeCoreMain from "./main-components/employeeCoreMain";
import EmployeeDocumentMain from "./main-components/employeeDocumentMain";
import EmployeeEventMain from "./main-components/employeeEventMain";
import EmployeeOverviewMain from "./main-components/employeeOverviewMain";
import EmployeePayslipsMain from "./main-components/employeePayslipsMain";
import EmployeePerformanceMain from "./main-components/employeePerformanceMain";
import EmployeeStatusMain from "./main-components/employeeStatusMain";

const { TabPane } = Tabs;
const { Option } = Select;

/**
 * Employee View Details Tabs Main section
 */
function EmployeeTabs(props: any) {
  const [activeKey, SetactiveKey] = useState("1");
  const [coreActiveSection, setcoreActiveSection] = useState(1);
  const [overviewActiveSection, setcoverviewActiveSection] = useState(1);
  const [performanceActiveSection, setperformanceActiveSection] = useState(1);
  //* *               UseEffects  start         **//
  useEffect(() => {
    setcoverviewActiveSection(1);
    setcoreActiveSection(1);
    SetactiveKey("1");
  }, [props.selectedEmployee]);

  //* *               UseEffects  end         **//
  const handleTabs = (Activekey) => {
    SetactiveKey(Activekey);
  };
  const handleToggle = (int) => {
    console.log("clicked", int);

    setcoreActiveSection(int);
  };

  console.log("EMPLOYEE IN TABS" + props.selectedEmployee._id);

  const menu1 = (
    <Menu>
      <Menu.Item>
        <a
          className={overviewActiveSection === 1 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setcoverviewActiveSection(1);
          }}
        >
          Training
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className={overviewActiveSection === 2 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setcoverviewActiveSection(2);
          }}
        >
          Compliance/learning
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item>
        <a
          className={performanceActiveSection === 1 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setperformanceActiveSection(1);
          }}
        >
          Feedback form
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className={performanceActiveSection === 2 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setperformanceActiveSection(2);
          }}
        >
          Late/Absent Export
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          className={coreActiveSection === 1 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setcoreActiveSection(1);
          }}
        >
          General
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className={coreActiveSection === 2 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setcoreActiveSection(2);
          }}
        >
          Payroll
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className={coreActiveSection === 4 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setcoreActiveSection(4);
          }}
        >
          Right to Work
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className={coreActiveSection === 5 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setcoreActiveSection(5);
          }}
        >
          Additional Documents
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className={coreActiveSection === 3 ? "Internal-tab-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setcoreActiveSection(3);
          }}
        >
          Summary
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='camapaign-tabs'>
      <Tabs onChange={handleTabs} activeKey={activeKey}>
        <TabPane
          tab={
            <>
              <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  Core&nbsp;
                  <CaretDownFilled />
                </a>
              </Dropdown>
            </>
          }
          key='1'
        >
          <EmployeeCoreMain ActiveSection={coreActiveSection} selectedEmployee={props.selectedEmployee} handleToggle={handleToggle} />
        </TabPane>
        <TabPane tab='Status' key='2'>
          {/* <Card>test</Card> */}
          <EmployeeStatusMain activeKey={activeKey} selectedEmployee={props.selectedEmployee} />
        </TabPane>
        <TabPane tab='Documents' key='3'>
          <EmployeeDocumentMain activeKey={activeKey} selectedEmployee={props.selectedEmployee} />
        </TabPane>
        <TabPane tab='Contract' key='4'>
          <EmplyeeContractMain activeKey={activeKey} selectedEmployee={props.selectedEmployee} />
        </TabPane>
        <TabPane tab='Payslips' key='5'>
          <EmployeePayslipsMain activeKey={activeKey} selectedEmployee={props.selectedEmployee} />
        </TabPane>
        <TabPane tab='Events' key='6'>
          <EmployeeEventMain activeKey={activeKey} selectedEmployee={props.selectedEmployee} />
        </TabPane>
        <TabPane
          tab={
            <>
              <Dropdown overlay={menu2}>
                <a onClick={(e) => e.preventDefault()}>
                  Performance&nbsp;
                  <CaretDownFilled />
                </a>
              </Dropdown>
            </>
          }
          key='7'
        >
          <EmployeePerformanceMain selectedEmployee={props.selectedEmployee} activeKey={activeKey} ActiveSection={performanceActiveSection} />
        </TabPane>
        <TabPane
          key='8'
          tab={
            <>
              <Dropdown overlay={menu1}>
                <a onClick={(e) => e.preventDefault()}>
                  Opertational&nbsp;
                  <CaretDownFilled />
                </a>
              </Dropdown>
            </>
          }
        >
          <EmployeeOverviewMain ActiveSection={overviewActiveSection} />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default EmployeeTabs;
