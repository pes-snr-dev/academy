import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import Ratio from "react-bootstrap/Ratio";
import ReactPlayer from "react-player";
import { FaPlus, FaEdit } from "react-icons/fa";

import CreateChapterVideoModal from "./ChapterVideoModal";
import { useGetChapterVideosQuery } from "@redux/slices/chaptersSlice";
import Loader from "@components/Loader";
import "./Common.css";

const Videos = ({ chapterId, versionId }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let versionVideos;
  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChapterVideosQuery(chapterId, {
    refetchOnMountOrArgChange: true,
  });

  if (videos) {
    versionVideos = videos.filter(function (el) {
      return el.version === versionId;
    });
  }

  console.log(videos, versionId);

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    return (
      <>
        <Row>
          <Col className="d-flex" style={{ flexWrap: "wrap", gap: "1.25%" }}>
            {!versionVideos && <p>No videos</p>}
            {versionVideos &&
              versionVideos.map((video, index) => (
                <Card key={index} style={{ width: "24%" }} className="mb-2">
                  <Ratio aspectRatio="16x9">
                    <ReactPlayer
                      controls={true}
                      url={video.path}
                      width="100%"
                      height="100%"
                    />
                  </Ratio>
                  <Card.Body>
                    <Card.Text>{video.title}</Card.Text>
                    <FaEdit size={25} />
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
        <CreateChapterVideoModal
          show={show}
          handleClose={handleClose}
          chapterId={chapterId}
          versionId={versionId}
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
  } else if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        {error?.data?.message || error.error || "Something went wrong!"}
      </div>
    );
  }
};

Videos.propTypes = {
  chapterId: PropTypes.string.isRequired,
  versionId: PropTypes.string.isRequired,
};

export default Videos;
