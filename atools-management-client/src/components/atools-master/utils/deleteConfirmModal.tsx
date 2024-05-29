
import * as React from 'react';
import { Modal, Button}  from "antd";
import {  DeleteOutlined } from "@ant-design/icons";
export interface DeleteConfirmModalProps {
  deletePopconfirm?:boolean;
  cancelDelete?:any;
  deleteSetConfirm?:any
}
 
const DeleteConfirmModal: React.SFC<DeleteConfirmModalProps> = ({deletePopconfirm,cancelDelete,deleteSetConfirm}) => {
    return (
        <>  
        <Modal
        footer={null}
        centered
        visible={deletePopconfirm}
        closable={true}
        maskClosable={true}
        onCancel={()=>cancelDelete()}
        className="delete-modal"
        zIndex={99}
        width={350}
      >
        <div className="text-center">
          <p
            className="inter-headline1-bold text-center mb-2"
            style={{ fontFamily: "Inter" }}
          >
            <DeleteOutlined style={{ fontSize: 50 }} />
          </p>

          <p
            className="inter-body1-regular text-center mb-3"
            style={{ fontFamily: "Inter" }}
          >
            Are you sure you want to delete this?
          </p>

          <div className="d-flex justify-content-around">
            <Button
              type="primary"
              className="delete-buttons"
              size="large"
              onClick={()=>deleteSetConfirm()}

            >
              Yes, Delete
            </Button>
            <Button
              type="primary"
              size="large"
              className="delete-buttons"
              onClick={()=>cancelDelete()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      </> );
}
 
export default DeleteConfirmModal;

