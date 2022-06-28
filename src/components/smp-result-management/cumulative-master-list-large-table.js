import React, { useRef } from "react";
import { Row, Button, Table, Badge } from "react-bootstrap";
// import { useDownloadExcel } from "react-export-table-to-excel";

const CumulativeMasterListLargeTable = ({ cumulativeListEntry }) => {
  const tableRef = useRef(null);
  //   const { onDownload } = useDownloadExcel({
  //     currentTableRef: tableRef.current,
  //     filename: "Master-list Table",
  //     sheet: "Result List"
  // });

  if (cumulativeListEntry?.resultList == null) {
    cumulativeListEntry.resultList = [];
  }
  const list = cumulativeListEntry?.resultList
    .map((list, idx) => list.subjects)
    .flat();
  const subjectList = list.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.subjectName === item.subjectName)
  );
  {
    console.log("here", cumulativeListEntry?.resultList);
  }
  return (
    <>
      <Row className="pt-3">
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="btn-sm mx-2"
            variant="btn btn-success"
            // onClick={onDownload}
          >
            Download
          </Button>
        </div>

        <Table
          size="md"
          bordered
          responsive
          className="mt-2 border-secondary"
          ref={tableRef}
        >
          <thead>
            <tr className="text-center" style={{ background: "#d8efd1" }}>
              <td
                className="text-uppercase h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                S/No
              </td>
              <td
                className="text-uppercase h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Student Name
              </td>
              <td
                className="text-uppercase h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Registration No
              </td>
              <td
                className="text-uppercase h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Position
              </td>
              <td
                className="text-uppercase h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Result Status
              </td>
              <td
                className="text-uppercase h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
                colSpan={
                  cumulativeListEntry?.resultList.map(
                    (item) => item.cumulativeTermAvgScore
                  ).length
                }
              >
                Term Cumulative Ave. Score
              </td>
              <td
                className="text-uppercase h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Cumulative Average Score
              </td>
              {subjectList?.map((subjectItem, idx) => (
                <td
                  colSpan={subjectItem.cumulativeTermAvgScore.length}
                  className="text-uppercase h6"
                  key={idx}
                >
                  {subjectItem.subjectName}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5"></td>
              <>
                {cumulativeListEntry?.resultList.map((item, idx) =>
                  item.cumulativeTermAvgScore.map((avgScore, id) => (
                    <td
                      style={{
                        textAlign: "center",
                        maxWidth: "5px",
                        padding: 2,
                      }}
                    >
                      {avgScore.termName}
                    </td>
                  ))
                )}
              </>
              <td></td>
              {subjectList?.map((subjectItem, idx) => (
                <>
                  {subjectItem.cumulativeTermAvgScore.map((avgScore, id) => (
                    <td
                      style={{
                        textAlign: "center",
                        maxWidth: "5px",
                        padding: 2,
                      }}
                    >
                      {avgScore.termName}
                    </td>
                  ))}
                </>
              ))}
            </tr>
            {cumulativeListEntry?.resultList.map((item, index) => (
              <tr
                style={{ maxHeight: "30px" }}
                key={index}
                className="text-center"
              >
                <td className="fw-bold">{index + 1}</td>
                <td className="fw-bold text-start">{item.studentName}</td>
                <td className="fw-bold text-start">
                  {item.registrationNumber}
                </td>
                <td className="fw-bold">{item.position}</td>
                <td className="fw-bold">
                  <Badge bg={item.status == "PASSED" ? "success" : "danger"}>
                    {item.status}
                  </Badge>
                </td>
                <>
                  {cumulativeListEntry?.resultList.map((item, idx) =>
                    item.cumulativeTermAvgScore.map((avgScore, id) => (
                      <td>
                        {item.cumulativeTermAvgScore.map(
                          (score, id) =>
                            score.termName == "1st" && score.totalScore
                        )}
                      </td>
                    ))
                  )}
                </>
                <td className="fw-bold">{item.averageScore}</td>

                {subjectList.map((subjectItem, id) => (
                  <>
                    {subjectItem.cumulativeTermAvgScore.map(
                      (avgScore, index) => (
                        <td className="px-3">
                          {item.subjects.find(
                            (subject) =>
                              subject.subjectName == subjectItem.subjectName
                          ) &&
                            item.subjects.map(
                              (i) =>
                                i.subjectName == subjectItem.subjectName &&
                                i.cumulativeTermAvgScore.map(
                                  (t) =>
                                    t.termId ==
                                      subjectItem.cumulativeTermAvgScore.map(
                                        (avg) => avg.termId
                                      ) && t.totalScore
                                )
                            )}
                        </td>
                      )
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default CumulativeMasterListLargeTable;
