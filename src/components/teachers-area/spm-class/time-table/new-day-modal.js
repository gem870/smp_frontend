import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { createTimetableDays } from "../../../../store/actions/timetable-actions";

export function NewDayModal({ selectedTimetable, selectedClassId }) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [newDay, setNewDay] = useState({
        day: '',
        classTimeTableId: '',
    });
    const [validation, setValidation] = useState("");
    //VARIABLE DECLARATION  isSuccessful

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { submitSuccessful } = state.timetable;
    const { showModal } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    const handeSubmit = () => {
        if (!newDay.day.trim()) {
            setValidation("Day is required");
        } else {
            createTimetableDays(newDay, selectedClassId)(dispatch);
            showHideModal(false)(dispatch);
        }
    }

    React.useEffect(() => {
        if (submitSuccessful) {
            setNewDay({day: "", classTimeTableId: ""});
        }
    }, [submitSuccessful]);

    React.useEffect(() => {
        if (showModal === false) {
            setValidation("");
            setNewDay({day: "", classTimeTableId: "" });
        }
    }, [showModal]);


    return (
        <SmpModal title={'Add New day'}>
            <Form className="pt-3">
                <div className="">
                    <p className="text-danger">{validation}</p>
                    <div className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Week Day</Form.Label>
                            <select
                                  as="select"
                                  name="weekday"
                                  className="form-select"
                                  id="weekday"
                                onChange={(e) => setNewDay({ day: e.target.value, classTimeTableId: selectedTimetable?.classTimeTableId })}
                            >
                                 <option value="">Select Week Day</option>
                                 <option value="Sunday">Sunday</option>
                                 <option value="Monday">Monday</option>
                                 <option value="Tuesday">Tuesday</option>
                                 <option value="Wednesday">Wednesday</option>
                                 <option value="Thursday">Thursday</option>
                                 <option value="Friday">Friday</option>
                                 <option value="Saturday">Saturday</option>
                                </select>
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-end mt-5">
                        <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => {
                                showHideModal(false)(dispatch);
                                respondModal('cancel')(dispatch);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className=""
                            onClick={handeSubmit}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Form>
        </SmpModal>
    )
}
