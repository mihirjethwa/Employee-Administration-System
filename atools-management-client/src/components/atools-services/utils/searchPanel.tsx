import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Pagination, Result } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../../../services/service";
import SearchCard from "./searchCard";
import "./utils.scss";
interface Data {
  page?: any;
  limit?: any;
  count?: any;
  data?: any;
  totalElements: any;
  handleCallback: any;
}

/**
 * Employee List of card in search panel
 */
const SearchPanel: React.FunctionComponent<Data> = ({ data, count, totalElements, handleCallback, ...props }) => {
  const [employee, SelectEmployee] = useState();
  const [data1, setData] = useState(data);

  useEffect(() => {
    //  code goes here    
    getRoleData();
    setallElements(totalElements);
    setPaginationStates();
    console.log("data from props");
    console.log(data1);

  }, [totalElements]);
  
  const [elementsPerPage, setelementsPerPage] = useState(5);
  const [pagesCount, setpagesCount] = useState(1);
  const [currentPageElements, setcurrentPageElements] = useState([]);
  const [allElements, setallElements] = useState([]);
  const [Roles,SetRolesData] = useState([])

  //!           getRoleData   start.........!//
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

//!           getRoleData   end.........!//
  const setPaginationStates = () => {
    setpagesCount(Math.ceil(count / elementsPerPage));
    setElementsForCurrentPage(0);
  };
  const setElementsForCurrentPage = (offset) => {
    console.log(totalElements.length + "asdgsdgsadgasdgasdg");

    setcurrentPageElements(totalElements);
  };
  const handlePageClick = (pageNumber) => {
    const currentPage = pageNumber - 1;
    setElementsForCurrentPage(currentPage * elementsPerPage);
    handleCallback(pageNumber, "changeData");

    // handleCallback(m, "SelectedEmployee");
  };
  const employeeSelect = (m) => {
    SelectEmployee(m);
    console.log(m);
    
    handleCallback(m, "SelectedEmployee");
  };

  return (
    <>
    {currentPageElements.length === 0 && 
    <Card className="searchCard mb-2 no-records mx-auto"><Result
    icon={<Empty description="No Employees Found"/>}
    style={{padding: 0, cursor: "pointer"}}
    extra={ <Link
      to={{
        pathname: "./addEmployee/store-and-title",
      }}
    >
    <Button className='add-button obutton' size='large' style={{margin: "0 auto"}}>
    <PlusOutlined /> Add Employee
  </Button>
  </Link>}
  /> </Card>}
      {currentPageElements.map((m) => (
        <div className={employee === m ? "search-active w-100 mb-2" : "w-100 mb-2"} onClick={() => employeeSelect(m)}>
          {m.length !== 0 ? <SearchCard data={m} Roles={Roles} /> : <></>}
        </div>
      ))}
      {currentPageElements.length !== 0 ? <Card className='paginationCard mb-2'> {pagesCount >= 1 && <Pagination defaultCurrent={1} onChange={handlePageClick} size='small' total={count} pageSize={elementsPerPage} />}</Card> : <></>}
    </>
  );
};
export default SearchPanel;
