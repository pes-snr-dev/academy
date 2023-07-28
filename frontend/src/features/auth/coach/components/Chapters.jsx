import { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { FaPlus, FaInfoCircle } from "react-icons/fa";
import CreateChapterModal from "./CreateChapterModal";
import { useGetChaptersQuery } from "../../../../slices/chaptersSlice";
import Loader from "../../../../components/Loader";

import "./Common.css";

const Chapters = ({ course }) => {
  const {
    data: chapters,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChaptersQuery(course, {
    refetchOnMountOrArgChange: true,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Row>
        <Col className="py-4">
          <h5>Chapters</h5>
          {isLoading && <Loader />}
          {isSuccess && !chapters.length && (
            <span className="m-0 p-0 d-flex align-items-center">
              <FaInfoCircle className="me-2" /> No data
            </span>
          )}
          {isSuccess && chapters.length > 0 && (
            <>
              {chapters.map((chapter, index) => (
                <div
                  className="d-flex position-relative mb-4 bg-light border p-2"
                  key={index}
                >
                  <div>
                    <h6 className="mt-0">{chapter.title}</h6>
                    <p>
                      Description <br></br>
                      {chapter.description ? chapter.description : "..."}
                    </p>
                    <a href="#" className="stretched-link">
                      More..
                    </a>
                  </div>
                </div>
              ))}
            </>
          )}
          {isError && (
            <div className="alert alert-danger" role="alert">
              {error?.data?.message || error.error || "Something went wrong!"}
            </div>
          )}
        </Col>
      </Row>

      <CreateChapterModal
        show={show}
        handleClose={handleClose}
        course={course}
      />
      <div
        className="position-fixed"
        style={{ right: "15%", bottom: "10%", zIndex: "1050" }}
      >
        <Button variant="primary btn-circle" onClick={handleShow}>
          <FaPlus size={30} />
        </Button>
      </div>
    </>
  );
};

Chapters.propTypes = {
  course: PropTypes.string.isRequired,
};

export default Chapters;
