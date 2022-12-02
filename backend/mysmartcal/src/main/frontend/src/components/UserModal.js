import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UserModal(state) {
    const [show, setShow] = useState(state.show);

    const handleClose = () => state.handleModalClose()

    useEffect(()=>{
        console.log("In modal state update effewct",state)
        setShow(state.show)
    },[state])

    const onConfirm = () => {
        state.onConfirm()
        state.handleModalClose()
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Slot Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want to book this slot?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserModal