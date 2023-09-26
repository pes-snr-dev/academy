"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { FaPlus, FaInfoCircle, FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import CreateChapterModal from "./CreateChapterModal";
import { useGetChaptersQuery } from "@redux/slices/chaptersSlice";
import Loader from "@components/Loader";
import { setCourseChapters } from "@redux/slices/courseChaptersSlice";

import "./Common.css";

const Chapters = ({ course }) => {
  const dispatch = useDispatch();

  const {
    data: chapters,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChaptersQuery(course, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    let data = {};
    data[course] = chapters;
    dispatch(setCourseChapters(chapters));
  }, [chapters, course, dispatch]);

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
                  className="d-flex position-relative mb-4 bg-light border p-2 hoverable"
                  key={index}
                >
                  <div>
                    <h6 className="mt-0">{chapter.title}</h6>
                    <p>
                      Description <br></br>
                      {chapter.description ? chapter.description : "..."}
                    </p>
                    <Link
                      href={`/profile/coach/courses/chapters/${chapter._id}`}
                      className="stretched-link"
                    >
                      <Navbar.Text>
                        <FaEllipsisH size={25} />
                      </Navbar.Text>z
                    </Link>
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
