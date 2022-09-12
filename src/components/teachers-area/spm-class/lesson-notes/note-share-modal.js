import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import {
  respondModal,
  showHideModal,
} from "../../../../store/actions/toaster-actions";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { getAllOtherStaff, shareLessonNotes } from "../../../../store/actions/class-actions";

export function NoteShareModal(props) {
  const dispatch = useDispatch();
  const [staffArray, setStaffArray] = useState([]);

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { otherStaffList } = state.class;
  const { showModal } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllOtherStaff(props.classNoteId)(dispatch);
  }, [props.classNoteId,dispatch]);

  React.useEffect(() => {
    showModal &&
    setStaffArray(otherStaffList.filter(c=> c.isShared === true).map(c=>c.teacherAccountId));
  }, [otherStaffList,showModal]);

  React.useEffect(() => {
    if(showModal === false){
    setStaffArray([])
  }
  }, [showModal]);
  

  const handleStaffArray = (event) => {
    const checkBoxValue = event.target.checked;
    const staffId = event.target.id;
    let selectedStaffArray;
    const otherSelectedStaff = staffArray.filter((staff) => staff != staffId);
    if (checkBoxValue === false) {
      selectedStaffArray = [...otherSelectedStaff];
    } else {
      selectedStaffArray = [...otherSelectedStaff, staffId];
    }
    setStaffArray(selectedStaffArray);
  };

  
  return (
    <>
    <SmpModal title={"Staff List"}>
      <div>
        <div className="mb-3">
          {otherStaffList?.map((staff, idx) => (
            <div key={idx}>
              <input
                type="checkbox"
                name="staff"
                id={staff.teacherAccountId}
                checked={staffArray.find(s=>s === staff.teacherAccountId)|| ""}
                onChange={(e) => {
                  handleStaffArray(e);
                }}
              />
              <span className="mx-2 text-uppercase">
                {staff.firstName} {staff.middleName} {staff.lastName}
              </span>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end">
          <Button
            variant="danger"
            className="mx-2"
            onClick={() => {
              showHideModal(false)(dispatch);
              respondModal("cancel")(dispatch);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" className="" onClick={() => {shareLessonNotes(props.classNoteId, staffArray)(dispatch);}}>
            Share
          </Button>
        </div>
      </div>
    </SmpModal>
    </>
  );
}
