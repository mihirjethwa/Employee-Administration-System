import { ExclamationCircleFilled, WarningFilled, StopFilled } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Row, Tooltip } from "antd";
import React from "react";
import "./utils.scss";

interface Data {
  data: any;
  Roles: any;
}

/**
 * Employee Card on employee list
 */
const SearchCard: React.FunctionComponent<Data> = ({ data, Roles, ...props }) => {
  // console.log("data from card");
  // console.log(data);
  return (
    <Card className='searchCard '>
      <Row>
        <Col span={4}>
          <Avatar size={40} style={{ backgroundColor: "#5A4992" }}>
            {data?.firstName[0]?.toUpperCase()}
            {data?.lastName[0]?.toUpperCase()}
          </Avatar>
        </Col>
        <Col span={19}>
          <Row>
            <Col span={24} className='inter-body2-medium mb-0' style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
              {data.firstName + " " + data.lastName}
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              className='inter-body2-regular mb-0'
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                fontSize: 12,
              }}
            >
              {data.email ? data.email : ""}
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              className='inter-body2-regular mb-0'
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                fontSize: 12,
              }}
            >
              {data.phoneNumber ? data.phoneNumber : ""}
            </Col>
          </Row>
          <Divider className='my-2' />
          <Row>
            <Col span={12} className='inter-body2-medium mb-0 d-flex'>
              <span>Store:</span> <span className='inter-body2-regular mb-0 ml-1'>{data.store ? data.store.storeName : "NA"}</span>
            </Col>
            <Col span={12} className='inter-body2-medium mb-0 d-flex'>
              <span>Job:</span> <span className='inter-body2-regular mb-0 ml-1'>{data ? data.role.roleName : "NA"}</span>
            </Col>
          </Row>
        </Col>
        <Col span={1}>
          {!data.formCompleted && (
            <Tooltip placement='topLeft' title='Incomplete employee details'>
              <ExclamationCircleFilled className='employeeIcon' style={{ color: "#FFB703" }} />
            </Tooltip>
          )}
          {data.isDocExpiringInThree && (
            <Tooltip placement='topLeft' title='Document expiring soon'>
              <WarningFilled className='employeeIcon' style={{ color: "#FFB703" }} />
            </Tooltip>
          )}
          {data.isDocExpired && (
            <Tooltip placement='topLeft' title='Document has been expired'>
              <StopFilled className='employeeIcon' style={{ color: "red" }} />
            </Tooltip>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default SearchCard;
