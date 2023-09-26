"use client";
import { useState, useEffect } from "react";
import { useGetCourseByIdQuery } from "@redux/slices/coursesSlice";
// import  from "react-bootstrap/Ratio";
import { Col, Row, Container, Ratio } from "react-bootstrap";
import Loader from "@components/Loader";
import FetchError from "@components/FetchError";
import NotFound from "@components/NotFound";
import Player from "@components/course/Player";
import Chapters from "@components/courses/Chapters";

import ChapterVideoProvider from "@providers/ChapterVideoProvider";

const page = ({ params }) => {
  const {
    data: course,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCourseByIdQuery(params.id);
  const [videoUrl, setVideoUrl] = useState("");
  const [version, setVersion] = useState("en");
  const [currentChapter, setCurrentChapter] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");

  const updateCurrentVideo = (newVideo) => {
    setCurrentVideo(newVideo);
  };
  const updateCurrentTitle = (newTitle) => {
    setCurrentTitle(newTitle);
  };

  useEffect(() => {
    if (isSuccess && course) {
      setCurrentChapter(course.chapters[0]._id);
    }
  }, [course]);
  if (isLoading) return <Loader />;
  if (isError) return <FetchError error={error} />;
  if (isSuccess && course)
    return (
      <Container fluid>
        <Row>
          <Col md={8}>
            <Player videoUrl={currentVideo} title={currentTitle} />
          </Col>
          <Col md={4}>
            <Chapters
              course={course}
              setCurrentVideo={updateCurrentVideo}
              setCurrentTitle={updateCurrentTitle}
            />
          </Col>
        </Row>
      </Container>
    );
  if (isSuccess && !course) return <NotFound item="course" />;
};

export default page;
