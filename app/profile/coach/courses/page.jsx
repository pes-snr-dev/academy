"use client";
import { useState } from "react";
import { Wrapper, CreateCourseModal, CoursesList } from "@components/coach";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Courses = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: session } = useSession();
  const userInfo = session?.user || {};

  return (
    <Wrapper>
      <div className="soft-shadow">
        <h3>My Courses</h3>
        <CoursesList userInfo={userInfo} />
      </div>
      <CreateCourseModal
        show={show}
        handleClose={handleClose}
        userInfo={userInfo}
      />
      <div className="position-fixed" style={{ right: "15%", bottom: "10%" }}>
        <Button variant="primary btn-circle" onClick={handleShow}>
          <FaPlus size={30} />
        </Button>
      </div>
    </Wrapper>
  );
};

export default Courses;
