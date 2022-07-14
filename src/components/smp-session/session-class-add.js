import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  createSessionClass,
  buildClassSubjectArray,
  getAllActiveClasses,
  getAllActiveSubjects,
  getAllActiveTeachers,
  updateClassSubjects,
} from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import { getActiveSession } from "../../store/actions/session-actions";
import { showErrorToast } from "../../store/actions/toaster-actions";

const SessionClassAdd = () => {
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

  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    sessionId: activeSession?.session,
    classId: "",
    formTeacherId: "",
    InSession: true,
    examScore: 70,
    assessmentScore: 30,
    passMark: 40,
    subjectExamScore: 70,
    subjectAssessmentScore: 30,
  });

  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    classId: Yup.string().required("Class is required"),
    formTeacherId: Yup.string().required("Form teacher is required"),
    examScore: Yup.number()
      .required("Examination score is required")
      .min(0, "Examination score must not be below 0")
      .max(100, "Examination score must not be above 100"),
    assessmentScore: Yup.number()
      .required("Assessment score is required")
      .min(0, "Assessment score must not be below 0")
      .max(100, "Assessment score must not be above 100"),
    passMark: Yup.number()
      .required("Pass Mark is required")
      .min(0, "Pass Mark score must not be below 0")
      .max(100, "Pass Mark score must not be above 100"),
    subjectExamScore: Yup.number()
      .required("Subject Examination score is required")
      .min(0, "Subject Examination score must not be below 0")
      .max(100, "Subject Examination score must not be above 100"),
    subjectAssessmentScore: Yup.number()
      .required("Subject Assessment score is required")
      .min(0, "Subject Assessment score must not be below 0")
      .max(100, "Subject Assessment score must not be above 100"),
  });

  const setCurrentSubjectScores1 = (
    subjectExamScore,
    subjectAssessmentScore,
    subjectId
  ) => {
    initialValues[`${subjectId}_subjectExamScore`] = subjectExamScore;
    initialValues[`${subjectId}_subjectAssessmentScore`] =
      subjectAssessmentScore;

    initialValues.subjectExamScore = subjectExamScore;
    initialValues.subjectAssessmentScore = subjectAssessmentScore;
    setInitialValues(initialValues);
  };

  const setCurrentSubjectScores2 = (
    subjectExamScore,
    subjectAssessmentScore
  ) => {
    classSubjects.map((subject, idx) => {
      initialValues[`${subject.subjectId}_subjectExamScore`] = subjectExamScore;
      initialValues[`${subject.subjectId}_subjectAssessmentScore`] = subjectAssessmentScore;
      updateClassSubjects(subjectExamScore, subjectAssessmentScore, classSubjects)(dispatch)
    });

    initialValues.subjectExamScore = subjectExamScore;
    initialValues.subjectAssessmentScore = subjectAssessmentScore;
    setInitialValues(initialValues);
  };

  React.useEffect(() => {
    getAllActiveClasses()(dispatch);
    getAllActiveTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
    getActiveSession()(dispatch);
  }, []);

  if (isSuccessful) {
    history.push(sessionLocations.sessionClassList);
  }

  //HANDLER FUNCTIONS

  const getSubjectId = (event, subjectId) => {
    const checkBoxValue = event.target.checked;
    buildClassSubjectArray(
      "",
      "",
      subjectId,
      "",
      classSubjects,
      checkBoxValue
    )(dispatch);
  };

  const getExamScores = (subjectId) => {
    buildClassSubjectArray(
      initialValues.subjectExamScore,
      initialValues.subjectAssessmentScore,
      subjectId,
      "",
      classSubjects,
      true
    )(dispatch);
  };

  const getAssessmentScores = (subjectId) => {
    buildClassSubjectArray(
      initialValues.subjectExamScore,
      initialValues.subjectAssessmentScore,
      subjectId,
      "",
      classSubjects,
      true
    )(dispatch);
  };

  const getSubjectTeacherId = (subjectId, subjectTeacherId) => {
    buildClassSubjectArray(
      "",
      "",
      subjectId,
      subjectTeacherId,
      classSubjects
    )(dispatch);
  };

  //HANDLER FUNCTIONS
  return (
    <>
      <div className="col-md-10 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    values.sessionId = activeSession?.sessionId;
                    values.classSubjects = classSubjects;
                    const score =
                      Number(values.examScore) + Number(values.assessmentScore);
                    if (score !== 100) {
                      showErrorToast(
                        "Examination and assessment must equal 100"
                      )(dispatch);
                      return;
                    }
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
                      <Row>
                        <Col md={6}>
                          <Field
                            type="text"
                            style={{ visibility: "hidden" }}
                            className="form-control"
                            name="subjectExamScore"
                            id="subjectExamScore"
                            values={values.subjectExamScore}
                          />
                        </Col>
                        <Col md={6}>
                          <Field
                            type="text"
                            style={{ visibility: "hidden" }}
                            className="form-control"
                            name="subjectAssessmentScore"
                            id="subjectAssessmentScore"
                            values={values.subjectAssessmentScore}
                          />
                        </Col>
                      </Row>
                      <Row>
                        {message && (
                          <div className="text-danger">{message}</div>
                        )}
                        {touched.classId && errors.classId && (
                          <div className="text-danger">{errors.classId}</div>
                        )}
                        {touched.formTeacherId && errors.formTeacherId && (
                          <div className="text-danger">
                            {errors.formTeacherId}
                          </div>
                        )}
                        {touched.examScore && errors.examScore && (
                          <div className="text-danger">{errors.examScore}</div>
                        )}
                        {touched.assessmentScore && errors.assessmentScore && (
                          <div className="text-danger">
                            {errors.assessmentScore}
                          </div>
                        )}
                        {touched.passMark && errors.passMark && (
                          <div className="text-danger">{errors.passMark}</div>
                        )}
                      </Row>
                      <Field
                        type="text"
                        className="form-control"
                        name="sessionClassId"
                        id="sessionClassId"
                        aria-describedby="sessionClassId"
                        hidden
                      />

                      <Row>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="sessionId" className="form-label">
                              Session
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
                        <Col >
                          <div className="form-group">
                            <label htmlFor="classId" className="form-label">
                              {" "}
                              Class{" "}
                            </label>
                            <Field
                              as="select"
                              name="classId"
                              className="form-select"
                              id="classId"
                              defaultValue={values.classId}
                              onChange={(event) =>
                                setFieldValue("classId", event.target.value)
                              }
                            >
                              <option value={""}>Select Class</option>
                              {activeClasses.map((classLookup, idx) => (
                                <option key={idx} value={classLookup.lookupId}>
                                  {classLookup.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </Row>

                      <div className="d-flex row justify-content-between">
                        <Col sm="6" lg="2">
                          <div className="form-group">
                            <label htmlFor="examScore" className="form-label">
                              {" "}
                              Exam Score
                            </label>
                            <Field
                              type="number"
                              onChange={(e) => {
                                setFieldValue("examScore", e.target.value);
                                setFieldValue(
                                  "assessmentScore",
                                  100 - e.target.value
                                );
                                setFieldValue(
                                  "subjectExamScore",
                                  Number(e.target.value)
                                ); 
                                 setCurrentSubjectScores2(
                                  Number(e.target.value),
                                  Number(100 - e.target.value)
                                );
                                classSubjects.map((subject, idx) => {
                                  setFieldValue(
                                    `${subject.subjectId}_subjectExamScore`,
                                    Number(e.target.value)
                                  )
                                  setFieldValue(
                                    `${subject.subjectId}_subjectAssessmentScore`,
                                    Number(100 - e.target.value)
                                  )
                                  });
                              }}
                              className="form-control p-sm-1 p-lg-2"
                              name="examScore"
                              id="examScore"
                              aria-describedby="examScore"
                              required
                              placeholder=" "
                            />
                          </div>
                        </Col>

                        <Col sm="6" lg="2">
                          <div className="form-group">
                            <label
                              htmlFor="assessmentScore"
                              className="form-label"
                            >
                              {" "}
                              Assesment{" "}
                            </label>
                            <Field
                              type="number"
                              onChange={(e) => {
                                setFieldValue(
                                  "examScore",
                                  100 - e.target.value
                                );
                                setFieldValue(
                                  "assessmentScore",
                                  e.target.value
                                );
                                setFieldValue(
                                  "subjectAssessmentScore",
                                  Number(e.target.value)
                                );
                                setCurrentSubjectScores2(
                                  Number(100 - e.target.value),
                                  Number(e.target.value)
                                );
                                classSubjects.map((subject, idx) => {
                                  setFieldValue(
                                    `${subject.subjectId}_subjectAssessmentScore`,
                                    Number(e.target.value)
                                  );
                                  setFieldValue(
                                    `${subject.subjectId}_subjectExamScore`,
                                    Number(100 - e.target.value)
                                  );
                                });
                              }}
                              className="form-control p-sm-1 p-lg-2"
                              name="assessmentScore"
                              id="assessmentScore"
                              aria-describedby="assessmentScore"
                              required
                              placeholder=" "
                            />
                          </div>
                        </Col>

                        <Col sm="6" lg="2">
                          <div className="form-group">
                            <label htmlFor="passMark" className="form-label">
                              {" "}
                              Pass Mark{" "}
                            </label>
                            <Field
                              type="number"
                              className="form-control p-sm-1 p-lg-2"
                              name="passMark"
                              id="passMark"
                              aria-describedby="passMark"
                              required
                              placeholder=" "
                            />
                          </div>
                        </Col>

                        <Col sm="6" lg="6">
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
                              className="form-select text-capitalize"
                              id="formTeacherId"
                              onChange={(event) =>
                                setFieldValue(
                                  "formTeacherId",
                                  event.target.value
                                )
                              }
                            >
                              <option value={""} defaultValue={""}>
                                Select Form Teacher
                              </option>
                              {activeTeachers.map((teacher, idx) => (
                                <option
                                  key={idx}
                                  value={teacher.teacherAccountId}
                                  selected={
                                    values?.formTeacherId ==
                                    teacher.teacherAccountId
                                  }
                                >
                                  {teacher.fullName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </div>

                      {touched.subjectExamScore && errors.subjectExamScore && (
                        <div className="text-danger">
                          {errors.subjectExamScore}
                        </div>
                      )}
                      {touched.subjectAssessmentScore &&
                        errors.subjectAssessmentScore && (
                          <div className="text-danger">
                            {errors.subjectAssessmentScore}
                          </div>
                        )}

                      <Table bordered responsive>
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Exam</th>
                            <th>Assessment</th>
                            <th>Subject Teacher</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSubjects.map((subject, idx) => (
                            <tr key={idx}>
                              <td style={{ width: "50%" }} className='text-uppercase'>
                                {" "}
                                <Field
                                  type="checkbox"
                                  id="subjectId"
                                  name="subjectId"
                                  className="form-check-input"
                                  checked={classSubjects.find(
                                    (sub) => sub.subjectId === subject.lookupId
                                  )}
                                  onChange={(e) => {
                                    getSubjectId(e, subject.lookupId);
                                  }}
                                />{" "}
                                {subject.name}
                              </td>

                              <td>
                                {" "}
                                {classSubjects.find(
                                  (sub) => sub.subjectId === subject.lookupId
                                ) ? (
                                  <Field
                                    type="number"
                                    className="form-control px-1"
                                    name={`${subject.lookupId}_subjectExamScore`}
                                    id={`${subject.lookupId}_subjectExamScore`}
                                    defaultValue={values.examScore}
                                    aria-describedby={`${subject.lookupId}_subjectExamScore`}
                                    required
                                    placeholder=" "
                                    onChange={(e) => {
                                      setCurrentSubjectScores1(
                                        Number(e.target.value),
                                        Number(100 - e.target.value),
                                        subject.lookupId
                                      );
                                      setFieldValue(
                                        "subjectExamScore",
                                        Number(e.target.value)
                                      );
                                      getExamScores(subject.lookupId);
                                      getAssessmentScores(subject.lookupId);
                                      setFieldValue(
                                        `${subject.lookupId}_subjectExamScore`,
                                        Number(e.target.value)
                                      );
                                      setFieldValue(
                                        `${subject.lookupId}_subjectAssessmentScore`,
                                        Number(100 - e.target.value)
                                      );
                                    }}
                                  />
                                ) : null}
                              </td>

                              <td>
                                {classSubjects.find(
                                  (sub) => sub.subjectId === subject.lookupId
                                ) ? (
                                  <Field
                                    type="number"
                                    className="form-control px-1 w-50"
                                    name={`${subject.lookupId}_subjectAssessmentScore`}
                                    id={`${subject.lookupId}_subjectAssessmentScore`}
                                    defaultValue={values.assessmentScore}
                                    aria-describedby={`${subject.lookupId}_subjectAssessmentScore`}
                                    required
                                    placeholder=" "
                                    onChange={(e) => {
                                      setCurrentSubjectScores1(
                                        Number(100 - e.target.value),
                                        Number(e.target.value),
                                        subject.lookupId
                                      );
                                      setFieldValue(
                                        "subjectAssessmentScore",
                                        Number(e.target.value)
                                      );
                                      setFieldValue(
                                        `${subject.lookupId}_subjectAssessmentScore`,
                                        Number(e.target.value)
                                      );
                                      setFieldValue(
                                        `${subject.lookupId}_subjectExamScore`,
                                        Number(100 - e.target.value)
                                      );
                                    }}
                                  />
                                ) : null}
                              </td>

                              <td style={{ width: "30%" }}>
                                <select
                                  name="subjectTeacherId"
                                  className="form-select text-capitalize"
                                  id="subjectTeacherId"
                                  onChange={(e) => {
                                    getSubjectTeacherId(
                                      subject.lookupId,
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option value="">Select Teacher</option>

                                  {activeTeachers.map((teacher, id) => (
                                    <option
                                      key={id}
                                      value={teacher.teacherAccountId}
                                      selected={
                                        classSubjects.find(
                                          (sub) =>
                                            sub.subjectTeacherId ===
                                              teacher.teacherAccountId &&
                                            sub.subjectId === subject.lookupId
                                        )
                                          ? true
                                          : false
                                      }
                                    >
                                      {teacher.fullName}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          variant="btn btn-danger mx-2"
                          onClick={() => {
                            history.goBack();
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
