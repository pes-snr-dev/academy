"use client";
import { Card } from "react-bootstrap";
import { FaRegClock, FaRegChartBar, FaStar } from "react-icons/fa";

export const CourseList = () => {
  return (
    <div className="d-flex flex-column pt-3 ps-3">
      <Card className="">
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">By Author</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&#39;s content.
          </Card.Text>
          <div className="d-flex justify-content-between">
            <div className="muted d-flex align-items-center" style={{verticalAlign:"middle"}}>
              <p className="mb-0 me-2">1:34</p>
              <FaRegClock />
            </div>
            <div className="d-flex align-items-center">
              <p className="mb-0 me-2">Beginner</p>
              <FaRegChartBar />
            </div>
            <div className="d-flex" style={{ verticalAlign: "middle" }}>
              <div className="me-2">
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="m-0">(3)</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
