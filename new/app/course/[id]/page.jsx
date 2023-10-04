"use client";
import { useState, useEffect } from "react";
import { useGetCourseByIdQuery } from "@redux/slices/coursesSlice";
import { Col, Row, Container } from "react-bootstrap";
import Loader from "@components/Loader";
import FetchError from "@components/FetchError";
import NotFound from "@components/NotFound";
import Player from "@components/course/Player";
import Chapters from "@components/courses/Chapters";
import useCourseList from "@hooks/useCourseList";
import { filterForVersionVideos } from "@services/chapter";

const page = ({ params }) => {
  const {
    data: course,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCourseByIdQuery(params.id);

  const [version, setVersion] = useState("en");
  const [currentVersionVideos, setCurrentVersionVideos] = useState([]);

  const handleJump = (newVideo) => {
    const videoIndex = videos.findIndex((item) => item._id === newVideo._id);
    goTo(videoIndex);
  };

  const { video, videos, goTo, back, next } =
    useCourseList(currentVersionVideos);

  useEffect(() => {
    if (isSuccess && course) {
      // set the videos to show based on current language version
      const filteredVideos =
        filterForVersionVideos(version, course.videos) ?? [];
      setCurrentVersionVideos([...currentVersionVideos, ...filteredVideos]);
    }
  }, [course]);

  if (isLoading) return <Loader />;
  if (isError) return <FetchError error={error} />;
  if (isSuccess && course)
    return (
      <Container fluid>
        <Row>
          <Col md={8}>
            {video && (
              <Player
                video={video}
                handleStepBack={back}
                handleStepNext={next}
              />
            )}
          </Col>
          <Col md={4}>
            <Chapters
              course={course}
              jump={handleJump}
              versionVideos={currentVersionVideos}
            />
          </Col>
        </Row>
      </Container>
    );
  if (isSuccess && !course) return <NotFound item="course" />;
};

export default page;
