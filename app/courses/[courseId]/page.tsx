"use client";
import { useState, useEffect } from "react";
import { FaPlayCircle, FaRegBookmark, FaAngleDown } from "react-icons/fa";
import {
  Row,
  Col,
  Container,
  Button,
  Collapse,
  Tab,
  Tabs,
} from "react-bootstrap";
import { FaStar, FaGlobe, FaClosedCaptioning } from "react-icons/fa";
import Link from "next/link";
import { useGetCourseByIdQuery } from "@redux/slices/coursesSlice";
import "@styles/course.css";
import RelatedCoursesList from "@components/courses/RelatedCoursesList";
import Loader from "@components/Loader";
import FetchError from "@components/FetchError";
import NotFound from "@components/NotFound";
import Chapters from "@components/courses/Chapters";
import { filterForVersionVideos } from "@services/chapter";

export default function CoursePage({ params }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("tableOfContents");
  const [version, setVersion] = useState("en");
  const [currentVersionVideos, setCurrentVersionVideos] = useState([]);

  const {
    data: course,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCourseByIdQuery(params.courseId);

  useEffect(() => {
    if (isSuccess && course) {
      // set the videos to show based on current language version
      const filteredVideos =
        filterForVersionVideos(version, course.videos) ?? [];
      setCurrentVersionVideos([...currentVersionVideos, ...filteredVideos]);
    }
  }, [course]);

  const setCurrentVideo = () => {};

  if (isLoading) return <Loader />;
  if (isError) return <FetchError error={error} />;
  if (isSuccess && course)
    return (
      <Container fluid>
        <section
          className="course-head row"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${course.thumbnail})`,
          }}
        >
          <header>
            <Row className="header-content p-5 w-100">
              <Col sm={12} md={7}>
                <h1>{course.title}</h1>
                <p>By {course.coach.username}</p>
                <p className="desc">{course.headline}</p>
                <div className="d-flex align-items-center">
                  <Link
                    href={`/course/${course._id}`}
                    target="_blank"
                    className="btn btn-primary me-5"
                  >
                    <FaPlayCircle /> Start Course
                  </Link>
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
                  Published by <a href="#">{course.coach.email}</a>
                </p>
                <p>Last updated {course.updatedAt}</p>
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
                {currentVersionVideos && (
                  <Chapters
                    course={course}
                    jump={setCurrentVideo}
                    versionVideos={currentVersionVideos}
                  />
                )}
              </Tab>
              <Tab eventKey="description" title="Description">
                {course.description}
              </Tab>
              <Tab eventKey="transcript" title="Transcript">
                {course.transcript}
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
                <RelatedCoursesList />
              </div>
            </div>
          </Col>
        </section>
      </Container>
    );
  if (isSuccess && !course) return <NotFound item="course" />;
}
