import { Col, Row, Select, Tabs } from "antd";
import Layout from "antd/lib/layout/layout";
import * as React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../list.scss";
import AddAccordian from "../utils/addAccordian";
import "../view-flow/employeeMain.scss";
import EmployeeCoreSecTionOne from "../view-flow/sub-components/employeeCoreSec1";
import EmployeeCoreSecTionTwo from "../view-flow/sub-components/employeeCoreSec2";
import EmployeeCoreSecTionThree from "../view-flow/sub-components/employeeCoreSec3";
import EmployeeCoreSecTionFour from "../view-flow/sub-components/employeeCoreSec4";
import EmployeeCoreSecTionFive from "../view-flow/sub-components/employeeCoreSec5";
import StoreAndTitle from "./main-components/storeAndTitle";
const { Option } = Select;
const { TabPane } = Tabs;

/**
 * Handler for Add Employee page navigations
 */
function AddEmployee(props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?: any;
  }
  let location = useLocation();
  const [pageOrder, setPageOrder] = useState(0)


  const page = () => {
    switch (location.pathname) {

      case '/services/addEmployee/store-and-title': return <StoreAndTitle addNew={true} callback={handleCallback} />;
      case "/services/addEmployee/general-details": return <EmployeeCoreSecTionOne addNew={true} callback={handleCallback} />;
      case "/services/addEmployee/payroll-details": return <EmployeeCoreSecTionTwo addNew={true} callback={handleCallback} />;
      case "/services/addEmployee/right-to-work": return <EmployeeCoreSecTionFour addNew={true} callback={handleCallback} />;
      case "/services/addEmployee/additional-documents": return <EmployeeCoreSecTionFive addNew={true} callback={handleCallback} />;
      case "/services/addEmployee/summary": return <EmployeeCoreSecTionThree addNew={true} callback={handleCallback} />;
      default: return <StoreAndTitle addNew={true} callback={handleCallback} />;
    }
  }



  const handleCallback = (childata: any, step = "default") => {
    switch (step) {
      case "PageOrder":
        setPageOrder(childata);
        break;
    }
  };

  return (
    <Layout style={{ marginTop: 72 }}>
      <Row className='bg-grey filter-panel mb-3'>
        <Col xxl={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 1 }}>
          <Row className='my-3'>
            <p className='inter-label-bold text-uppercase white mb-0'>Services &gt; Employee Manager &gt; Add Employee</p>
          </Row>
          <Row>
            <Col xxl={{ span: 24 }} lg={{ span: 24 }} className='d-flex justify-content-between'>
              <div>
                <h5 className='d-inline-flex align-items-center inter-headline1-bold white mb-1'>Add Employee</h5>

                <p className='inter-body2-regular text-center white' style={{ opacity: 0.7 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                </p>
              </div>
              {/* <div className='d-flex align-items-center'>
                <Button className='export-button obutton' size='large'>
                  <DownloadOutlined /> Export Details
                </Button>
                <Button className='add-button ml-2 obutton' size='large'>
                  <PlusOutlined /> Add Employee
                </Button>
              </div> */}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className='mx-0'>
        <Col xxl={{ span: 5, offset: 2 }} lg={{ span: 6, offset: 1 }} className='mt-3'>
          <AddAccordian pageOrder={pageOrder} />
        </Col>
        <Col xxl={{ span: 15 }} lg={{ span: 16 }} className='mt-3 camapaign-tabs'>
          {page()}
        </Col>



      </Row>
    </Layout>
  );
}
export default AddEmployee;
