import { Col, Modal, Row } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import Export from "../../../assets/common/modal/Export.svg";
import EmpAvatar from "../../../assets/common/modal/EmpAvatar.svg";
import Close from "../../../assets/common/drawer/Close.svg";
import "./modal.css";
import service from "../../../services/service";

interface ModalProps {
  visible: boolean;
  modalClose: () => void;
}

const ExportModal: React.FC<ModalProps> = (props: ModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(props.visible);
  }, [props.visible]);

  const handleCancel = () => {
    setIsModalVisible(false);
    props.modalClose();
  };

  const title = () => {
    return (
      <Row align='middle'>
        <Col span={2} style={{ textAlign: "center" }}>
          <img src={Export} alt='export' />
        </Col>
        <Col style={{ textAlign: "left" }} span={21}>
          <Row className='modal-title'>Export</Row>
          <Row className='modal-sub-title'>Sub-title text will be displayed here</Row>
        </Col>
        <Col span={1} style={{ alignItems: "end" }}>
          <img src={Close} alt='close' onClick={() => handleCancel()} style={{ cursor: "pointer" }} />
        </Col>
      </Row>
    );
  };

  const exportEmployeeList = () => {
    window.open(`${service.baseURL}/export/excel/employee-basic-info`);
  };

  const exportStarters = () => {
    window.open(`${service.baseURL}/export/excel/starters-leavers-report`);
  };

  const exportContractAmends = () => {
    window.open(`${service.baseURL}/export/excel/contact-amends-report`);
  };

  const exportRightToWork = () => {
    window.open(`${service.baseURL}/export/excel/right-to-work-report`);
  };

  const exportJob = () => {
    window.open(`${service.baseURL}/export/excel/job-documents-report`);
  };
  const exportUsername = () => {
    window.open(`${service.baseURL}/export/excel/usernames-report`);
  };
  const exportEmail = () => {
    window.open(`${service.baseURL}/export/excel/payroll/email-audit-report`);
  };
  const exportNi = () => {
    window.open(`${service.baseURL}/export/excel/payroll/ni-audit-report`);
  };

  return (
    <div>
      <Modal title={title()} visible={isModalVisible} onCancel={handleCancel} footer={null} width={"60%"} closable={false}>
        <Row gutter={[10, 10]} justify='space-around'>
          <Row className='modal-export-card' onClick={exportEmployeeList}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>Employee List</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportStarters}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>Starters/Leavers Report</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportContractAmends}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>Contract Amends Report</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportJob}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>Job Docs</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportRightToWork}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>Right To Work</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportUsername}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>Usernames</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportEmail}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>Email Audit</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportNi}>
            <Col span={6}>
              <img src={EmpAvatar} alt='avatar' />
            </Col>
            <Col span={14}>
              <Row className='modal-export-card-title'>NI Number Audit</Row>
              <Row className='modal-export-card-subtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</Row>
            </Col>
          </Row>
          <Row className='modal-export-card' onClick={exportNi}>
            <Col span={6}></Col>
            <Col span={14}></Col>
          </Row>
        </Row>
      </Modal>
    </div>
  );
};

export default ExportModal;
