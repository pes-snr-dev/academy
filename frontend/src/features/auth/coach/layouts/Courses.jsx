import { useState } from "react";
import { Wrapper, CreateCourseModal, CoursesList } from "../components";
import { Button } from "react-bootstrap";

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
      <div className="position-fixed" style={{ right: "10%", bottom: "10%" }}>
        <Button variant="primary" onClick={handleShow}>
          Add Course
        </Button>
      </div>
    </Wrapper>
  );
};

export default Courses;
