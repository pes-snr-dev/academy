"use client";
import { useState } from "react";
import { FaPlayCircle, FaRegBookmark, FaAngleDown } from "react-icons/fa";
import {
  Row,
  Col,
  Container,
  Accordion,
  Button,
  Collapse,
  Tab,
  Tabs,
} from "react-bootstrap";
import useCourses from "@hooks/useCourses";
import Course from "@components/courses/Course";
import "@styles/course.css";
import { FaStar, FaGlobe, FaClosedCaptioning } from "react-icons/fa";
import Link from "next/link";

const CoursePage = () => {
  const { courses } = useCourses();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("tableOfContents");

  return (
    <Container fluid>
      <section className="course-head row">
        <header>
          <Row className="header-content p-5 w-100">
            <Col sm={12} md={7}>
              <h1>Course Title</h1>
              <p>By Esther Kahuko</p>
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officia expedita vitae et quia corporis. Soluta eaque quisquam
                officiis, voluptas similique error nihil dolore! Incidunt in
                adipisci, suscipit laboriosam dolorum sunt!
              </p>
              <div className="d-flex align-items-center">
                <button className="btn btn-primary me-5">
                  <FaPlayCircle /> Start Course
                </button>
                <Link href="#">
                  <FaRegBookmark className="me-2" />
                  Bookmark
                </Link>
              </div>
            </Col>
            <Col sm={12} md={5}>
              <div className="d-flex align-items-center">
                <span className="mb-0 text-with-icon">3</span>
                <div className="me-2 text-with-icon">
                  <FaStar size={15} />
                  <FaStar size={15} />
                  <FaStar size={15} />
                </div>
                <p className="mb-0 text-with-icon">(1230 ratings)</p>
              </div>
              <p>
                Published by <a href="#">Esther Kahuko</a>
              </p>
              <p>Last updated 14, November 2023</p>
              <span className="text-with-icon">
                <FaGlobe size={15} />
                <p className="mb-0 ms-2 text-with-icon">English, French</p>
              </span>
              <div className="mt-2">
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="subtitles-collapse-text"
                  aria-expanded={open}
                  className="text-center"
                >
                  <FaClosedCaptioning size={15} /> <FaAngleDown />
                </Button>
                <Collapse in={open}>
                  <div id="subtitles-collapse-text">
                    English [Auto], French [Auto], Portuguese [Auto], Dutch
                    [Auto], French [Auto], German [Auto], Indonesian [Auto],
                    Italian [Auto], Japanese [Auto], Korean [Auto], Polish
                    [Auto], Simplified Chinese [Auto], Spanish [Auto], Thai
                    [Auto], Turkish [Auto], Vietnamese [Auto]
                  </div>
                </Collapse>
              </div>
            </Col>
          </Row>
        </header>
      </section>
      <section className="row mt-2 px-5">
        <Col>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="tableOfContents" title="Table of Contents">
              <Accordion defaultActiveKey={["0"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Course Overview</Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-style-0">
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Introduction</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Why this course</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">What you will learn</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Preparation</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Summary</a>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Chapter One</Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-style-0">
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Introduction</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Why this course</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">What you will learn</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Preparation</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Summary</a>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Chapter Two</Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-style-0">
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Introduction</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Why this course</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">What you will learn</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Preparation</a>
                      </li>
                      <li>
                        <FaPlayCircle className="me-4" /> <a href="#">Summary</a>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab>
            <Tab eventKey="description" title="Description">
              Description
            </Tab>
            <Tab eventKey="transcript" title="Transcript">
              Transcript
            </Tab>
            <Tab eventKey="materials" title="Materials">
              Materials
            </Tab>
            <Tab eventKey="discussion" title="Discussion">
              Discussion
            </Tab>
          </Tabs>
        </Col>
      </section>
      <section className="row mt-2 px-5">
        <Col>
          <div className="mt-4">
            <h3 className="fs-4">Related Courses</h3>
            <div className="related-coursed-grid">
              {courses.map((course, index) => (
                <Course
                  key={course._id}
                  rating={course.rating}
                  title={course.title}
                  image={course.thumbnail}
                  author={course.author}
                  cost={course.cost}
                  size="100%"
                />
              ))}
            </div>
          </div>
        </Col>
      </section>
    </Container>
  );
};

export default CoursePage;
