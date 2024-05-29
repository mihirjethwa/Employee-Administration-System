import * as React from 'react';
import { useState, useEffect } from 'react';
import {Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input } from 'antd'
import Layout from 'antd/lib/layout/layout';
import './list.scss';
import SortByDropdown from '../../utils/SortByDropdown'
import ProfilePic from '../../assets/list/profile.png'
import {PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, DownloadOutlined, PlusOutlined} from '@ant-design/icons';

const { Option } = Select;

function List (props: any) {
  interface Sort {
    columnKey?: string;
    order?: any;
  }
  interface Filter {
    name?:any;
  }
  const [status, Setstatus] = useState('Current')
  const [sort, Setsort] = useState('Start Date')
  const [filteredInfo, SetfilteredInfo] = useState<Filter>({});
  const [sortedInfo, SetsortedInfo] = useState<Sort>({});
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  }
  const handleSearch = (e:any) =>{
    let name = e.target.value ;
    SetfilteredInfo({"name": [name]})
  }
  const handleStatusChange = (e:any) =>{
    console.log(e);
    
    Setstatus(e.target.value)
  }
  const   handleChange = (filters?: any,pagination?: any,  sorter?: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    SetfilteredInfo(filters)
    SetsortedInfo(sorter)
  };
    const handleEdit = () =>{

    }
    const handleView = () =>{

    }
    const handleCallback = (childata: any, step = "default") => {
      switch (step) {
        case "Sort":
        
          Setsort(childata);
          switch (childata){
          case "Start Date":
            SetsortedInfo({ columnKey: "start_date",
          order: "ascend"})
        
          
          break;
          case "Last name":
            SetsortedInfo({ columnKey: "lastname",
          order: "ascend"})
          break;
      }
    
          break;
      }
    }
    const dataSource = [
        {   
            profileImage:ProfilePic,
            key:'1',
            lastname:"Abariute",
            firstname:'Erika',
            employee_id:'405512',
            store:'Barnsley',
            role:'Area Manager',
            job:'Instore',
            start_date:'07/01/2021	',
            email_id:'abariuteerika@gmail.com',
            document_status:'Action Required',
            contract:'Active'
        },
        {   
          profileImage:ProfilePic,
          key:'2',
          lastname:"Bbari",
          firstname:'Erika',
          employee_id:'405512',
          store:'Barnsley',
          role:'Area Manager',
          job:'Instore',
          start_date:'07/01/2021	',
          email_id:'abariuteerika@gmail.com',
          document_status:'Action Required',
          contract:'Active'
      }
    ];
    const columns = [
        {
            title: <PictureOutlined />,
            dataIndex: 'profileImage',
            key: 'profileImage',
            render: (record: { profileImage: React.ReactNode; }) => {
                return {
                  children: (
                    <Avatar src={record.profileImage} />
                  ),
                };
              },
          },
        {
          title: 'Last Name',
          dataIndex: 'lastname',
          key: 'lastname',
          filteredValue: filteredInfo.name || null,
          onFilter: (value: any, record:any) => record.lastname.includes(value) || record.firstname.includes(value),
          sorter:{compare: (a:any, b:any) => a.lastname.length - b.lastname.length, multiple: 2,},
          sortOrder: sortedInfo.columnKey === 'lastname' && sortedInfo.order,
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
          },
          {
            title: 'Employee Id',
            dataIndex: 'employee_id',
            key: 'employee_id',
          },
          {
            title: 'Store',
            dataIndex: 'store',
            key: 'store',
          },
          {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
          },
          {
            title: 'Job',
            dataIndex: 'job',
            key: 'job',
          },
          {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'start_date',
            sorter:{compare: (a:any, b:any) => Date.parse(a.start_date) - Date.parse(b.start_date), multiple: 1},
            sortOrder: sortedInfo.columnKey === 'start_date' && sortedInfo.order,
          },
          {
            title: 'Email ID',
            dataIndex: 'email_id',
            key: 'email_id',
          },
          {
            title: 'Document Status',
            dataIndex: 'document_status',
            key: 'document_status',
            render:(text: any) => {
              return(
                <div className="document-tag">
                <Tag color="red">{text}</Tag>
                </div>
              )
            }
          },
          {
            title: 'Contract',
            dataIndex: 'contract',
            key: 'contract',
            render:(text: any) => {
              return(
                <div className="document-tag">
                <Tag color="green">{text}</Tag>
                </div>
              )
            }
          },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          render: () => {
            return {
              children: (
               <div className="d-flex">
               <Button
                className="action-buttons"
                shape="circle"
                size="middle"
                icon={<EditOutlined /> }
                onClick={()=>handleEdit}
                    ></Button> 
                    <Button
                      className="action-buttons ml-2"
                   shape="circle"
                   size="middle"
                   icon={<EyeOutlined /> }
                   onClick={()=>handleView}
                 ></Button>
               </div>
              ),

            };
          },
        },
      ];

    return (
    
        <Layout>
            <Row className="bg-grey filter-panel"  style={{marginTop:72}} >
            <Col xxl={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 1 }} className="d-flex justify-content-between">
              <div>
            <Select
    showSearch
    style={{ width: 200}}
    placeholder="Select store"
    onChange={onChange}
    size="large"
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
  <Select
    showSearch
    style={{ width: 200}}
    placeholder="Select Job Role"
    onChange={onChange}
    className="ml-2"
    size="large"
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
  <Radio.Group value={status} onChange={handleStatusChange}   size="large"  buttonStyle="solid"   className="ml-2 filter-radio ">
          <Radio.Button value="Current">Current</Radio.Button>
          <Radio.Button value="Leaver">Leaver</Radio.Button>
          <Radio.Button value="Deleted">Deleted</Radio.Button>
        </Radio.Group>
  </div>
  <div className="d-flex">
  <Button className="export-button obutton" size="large"><DownloadOutlined /> Export</Button>
  <Button className="add-button ml-2 obutton" size="large"><PlusOutlined /> Add Employee</Button>
  </div>
              </Col>
</Row>
          <Row gutter={[0, 24]}>
           <Col xxl={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 1 }} className="mt-3">
           
        <Row
    
        className="mx-0"
        justify="space-between"
        style={{ marginBottom: 16, zIndex: 101 }}
      >
        <div>
          <h5 className="d-inline-flex align-items-center inter-headline1-bold">
           120 Influencers found
          </h5>

          <p
            className="inter-body2-regular text-center"
            style={{ opacity: 0.7 }}
          >
            Here are 12 influencers that match your
            search
          </p>
        </div>
         <div className="d-inline-flex">
         <Input placeholder="Type to search" className="mr-2" allowClear style={{height:40}} onChange={handleSearch} />
         <SortByDropdown options={['Start Date','Last name']} defaultValue={sort} data='Sort' callback={handleCallback} />
         </div>
      </Row>
        <Table dataSource={dataSource} columns={columns} onChange={handleChange}   pagination={{ position: ["bottomLeft"] }}/>
        </Col>
        </Row>
        </Layout>
       
      
    );
}
export default List;
