import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  createSessionClass,
  buildClassSubjectArray,
  getAllActiveClasses,
  getAllActiveSubjects,
  getAllActiveTeachers,
} from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import { getActiveSession } from "../../store/actions/session-actions";

const SessionClassAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    classId: Yup.string().required("Class is required"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    isSuccessful,
    message,
    activeTeachers,
    activeSubjects,
    activeClasses,
    classSubjects,
  } = state.class;

  const { activeSession } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //USE STATE VARIABLE DECLARATION
  const [disableSubjectSelect, setDisableSubjectSelect] = useState(
    new Array(activeSubjects.length).fill(false)
  );
  //USE STATE VARIABLE  DECLARATION
  React.useEffect(() => {
    getAllActiveClasses()(dispatch);
    getAllActiveTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
    getActiveSession()(dispatch);
  }, []);

  React.useLayoutEffect(() => {
    setDisableSubjectSelect(new Array(activeSubjects.length).fill(false));
  }, [activeSubjects]);

  if (isSuccessful) {
    history.push(classLocations.sessionClassList);
  }

  //HANDLER FUNCTIONS
  const handleSubjectCheckAndTeacherSelect = (position) => {
    const updatedCheckedState = disableSubjectSelect.map((item, index) =>
      index === position ? !item : item
    );
    setDisableSubjectSelect(updatedCheckedState);
  };

  const getSubjectId = (event, subjectId) => {
    const checkBoxValue = event.target.checked;
    buildClassSubjectArray(
      subjectId,
      "",
      classSubjects,
      checkBoxValue
    )(dispatch);
  };

  const getSubjectTeacherId = (subjectId, subjectTeacherId) => {
    buildClassSubjectArray(
      subjectId,
      subjectTeacherId,
      classSubjects
    )(dispatch);
  };

  //HANDLER FUNCTIONS
  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionId: activeSession?.session,
                    classId: "",
                    formTeacherId: "",
                    InSession: true,
                  }}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    values.classSubjects = classSubjects;
                    values.sessionId = activeSession?.sessionId;
                     createSessionClass(values)(dispatch);
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    values,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      {touched.classId && errors.classId && (
                        <div className="text-danger">
                          {errors.classId}
                        </div>
                      )}
                      <Col lg="12">
                        <div className="form-group">
                          <label htmlFor="sessionId" className="form-label">
                            {" "}
                            Session{" "}
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="sessionId"
                            id="sessionId"
                            aria-describedby="sessionId"
                            value={activeSession?.session}
                            readOnly
                          />
                        </div>
                      </Col>

                      <div className="d-flex row justify-content-between">
                        <Col lg="6">
                          <div className="form-group">
                            <label htmlFor="classId" className="form-label"> Class </label>
                            <Field
                              as="select"
                              name="classId"
                              className="form-select"
                              id="classId"
                              onChange={(event) => setFieldValue('classId', event.target.value)}
                            >
                              <option value={''} defaultValue={''} >
                                Select Class
                              </option>
                              {activeClasses.map((classLookup, idx) => (
                                <option
                                  key={idx}
                                  value={classLookup.lookupId}
                                >
                                  {classLookup.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>

                        <Col lg="6">
                          <div className="form-group">
                            <label
                              htmlFor="formTeacherId"
                              className="form-label"
                            >
                              Form Teacher
                            </label>
                            <Field
                              as="select"
                              name="formTeacherId"
                              className="form-select"
                              id="formTeacherId"
                              onChange={(event) => setFieldValue('formTeacherId', event.target.value)}
                            >
                              <option value={''} defaultValue="">
                                Select Form Teacher
                              </option>
                              {activeTeachers.map((teacher, idx) => (
                                <option
                                  key={idx}
                                  value={teacher.teacherAccountId}
                                >
                                  {teacher.fullName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </div>

                      {touched.classId && errors.subjectId && (
                        <div className="text-danger">{errors.subjectId}</div>
                      )}
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Subject Teacher</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSubjects.map((subject, idx) => (
                            <tr key={idx}>
                              <td>
                                {" "}
                                <Field
                                  type="checkbox"
                                  id="subjectId"
                                  name="subjectId"
                                  className="form-check-input"
                                  checked={disableSubjectSelect[idx]}
                                  onChange={(e) => {
                                    handleSubjectCheckAndTeacherSelect(idx);
                                    getSubjectId(e, subject.lookupId);
                                  }}
                                />{" "}
                                {subject.name}
                              </td>
                              <td>
                                <select
                                  name="subjectTeacherId"
                                  className="form-select"
                                  id="subjectTeacherId"
                                  disabled={disableSubjectSelect[idx] ? false : true}
                                  onChange={(e) => {
                                    getSubjectTeacherId(
                                      subject.lookupId,
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option value="">
                                    Select Teacher
                                  </option>

                                  {activeTeachers.map((teacher, id) => (
                                    <option
                                      key={id}
                                      value={teacher.teacherAccountId}                                
                                    >
                                      {teacher.fullName}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          variant="btn btn-danger mx-2"
                          onClick={() => {
                            history.push(classLocations.sessionClassList);
                          }}
                        >
                          Cancel
                        </Button>{" "}
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SessionClassAdd;
