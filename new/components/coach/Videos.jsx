import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Ratio from "react-bootstrap/Ratio";
import ReactPlayer from "react-player";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import CreateChapterVideoModal from "./ChapterVideoModal";
import { useGetChapterVideosQuery } from "@redux/slices/chaptersSlice";
import Loader from "@components/Loader";
import "./Common.css";
import FetchError from "@components/FetchError";
import { filterForVersionVideos } from "@services/chapter";
import { useDeleteChapterVideoMutation } from "@redux/slices/videoSlice";

const Videos = ({ chapterId, version, versionId }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteCourse] = useDeleteChapterVideoMutation();
  const onDeleteHandler = async (e, id) => {
    e.preventDefault();
    try {
      await deleteCourse(id).unwrap();
      toast("Video deleted successfuly");
    } catch (error) {
      toast(error);
    }
  };

  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChapterVideosQuery(chapterId, {
    refetchOnMountOrArgChange: true,
  });

  let versionVideos;

  if (videos) {
    // versionVideos = videos.filter(function (el) {
    //   return el.version === versionId;
    // });
    versionVideos = filterForVersionVideos(version, videos);
  }

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
                  </Card.Body>
                  <Card.Footer className="d-flex gap-3 justify-content-end">
                    <FaEdit size={25} className="text-primary cursor-pointer" />
                    <FaTrash
                      size={25}
                      className="text-danger cursor-pointer"
                      onClick={(e) => onDeleteHandler(e, video._id)}
                    />
                  </Card.Footer>
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
    return <FetchError error={error} />;
  }
};

Videos.propTypes = {
  chapterId: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  versionId: PropTypes.string.isRequired,
};

export default Videos;
