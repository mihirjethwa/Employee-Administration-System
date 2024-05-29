import { Modal, Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import Store from "../Store";
import { useHistory } from "react-router-dom";
import { setSessionTimeOut } from "../redux/actions/SessionTimeoutAction";
import LoginForm from "../components/authentication/Login";
import { logoutUser } from "../redux/actions/AuthActions";

interface Data {
  set: any;
}
const ErrorModal: React.FunctionComponent<Data> = ({ set }) => {
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const history = useHistory();
  useEffect(() => {
    if (set === true) {
      setVisible(true);
    }
    if (set === false) {
      setVisible(false);
    }
  }, [set]);

  const handleOnClick = (e: { preventDefault: () => void }) => {
    Store.dispatch(setSessionTimeOut(false));
    Store.dispatch(logoutUser() as any);
  };

  return (
    <>
      <Modal footer={null} visible={visible} closable={false} maskClosable={false} zIndex={10001}>
        <Result
          status='warning'
          title='Your session has been expired. Please login to create new session.'
          extra={
            <Button type='primary' shape='round' size='large' onClick={handleOnClick} style={{ width: 250, fontSize: 14, fontFamily: "Inter" }}>
              Login
            </Button>
          }
        />
        ,{/* <LoginForm redirection = {false} /> */}
      </Modal>
    </>
  );
};

export default ErrorModal;
