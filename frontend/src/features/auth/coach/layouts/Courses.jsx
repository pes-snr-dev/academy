import { useState } from "react";
import { Wrapper, CreateCourseModal } from "../components";
import { Card, Button } from "react-bootstrap";

const Courses = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Wrapper>
      <div className="soft-shadow">
        <h3>My Courses</h3>
        <ul className="undecorated-links m-0 p-0 d-flex flex-column gap-3">
          <li>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Course Title</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Facere qui unde cupiditate, voluptatibus veniam maxime quae
                  vel adipisci cumque ex eveniet, reprehenderit voluptatem
                  incidunt fugiat? Enim provident sit quaerat maxime!
                </Card.Text>
                <ul className="undecorated-links m-0 p-0 gap-2 d-flex justify-content-end">
                  <li>
                    <Button variant="primary">Edit</Button>
                  </li>
                  <li>
                    <Button variant="primary">Delete</Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </li>
          <li>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Course 2</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Facere qui unde cupiditate, voluptatibus veniam maxime quae
                  vel adipisci cumque ex eveniet, reprehenderit voluptatem
                  incidunt fugiat? Enim provident sit quaerat maxime!
                </Card.Text>
                <ul className="undecorated-links m-0 p-0 gap-2 d-flex justify-content-end">
                  <li>
                    <Button variant="primary">Edit</Button>
                  </li>
                  <li>
                    <Button variant="primary">Delete</Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </li>
        </ul>
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
