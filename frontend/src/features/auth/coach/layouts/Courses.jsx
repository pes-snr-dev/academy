import { useState } from "react";
import { Wrapper, CreateCourseModal, CoursesList } from "../components";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "../components/Common.css";

const Courses = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Wrapper>
      <div className="soft-shadow">
        <h3>My Courses</h3>
        <CoursesList />
      </div>
      <CreateCourseModal show={show} handleClose={handleClose} />
      <div className="position-fixed" style={{ right: "15%", bottom: "10%" }}>
        <Button variant="primary btn-circle" onClick={handleShow}>
          <FaPlus size={30} />
        </Button>
      </div>
    </Wrapper>
  );
};

export default Courses;
