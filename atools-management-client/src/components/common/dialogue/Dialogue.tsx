import React, { useState } from 'react'
import { Modal, Button, Space } from 'antd';

interface DialogueProps {
    title: string,
    message: string
}

const Dialogue: React.FC<DialogueProps> = (props: DialogueProps) => {

    const [visible, setVisible] = useState(true)

    const showModal = () => {
        setVisible(true)
    };
    
    const hideModal = () => {
        setVisible(false)
    };
    
    return (
        <Modal
            title={props.title}
            visible={visible}
            onOk={hideModal}
            onCancel={hideModal}
            okText="Okay"
            cancelText="Cancel"
            >
            <p>{props.message}</p>
        </Modal>
    )
}

export default Dialogue
