import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";

export function SmpModal(props, { title }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
  const {showModal, modalResponse } = state.alert;
    return (
        <Modal show={showModal} onHide={() =>{
             showHideModal(false)(dispatch)
             respondModal('cancel')(dispatch);
            }
        }
            id="viewModal"
            centered
        >
            <Modal.Header closeButton >
                <Modal.Title className="h5">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>


        </Modal>

    )
}