import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useGetChapterVideosQuery } from "../../../../slices/chaptersSlice";
import Loader from "../../../../components/Loader";
import Ratio from "react-bootstrap/Ratio";
import ReactPlayer from "react-player";

const Videos = ({ chapterId, versionId }) => {
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
      <Row>
        <Col className="d-flex" style={{ flexWrap: "wrap", gap: "1.25%" }}>
          {!versionVideos && <p>No videos</p>}
          {versionVideos &&
            versionVideos.map((video, index) => (
              <Card key={index} style={{ width: "24%" }} className="mb-2">
                <Ratio aspectRatio="16x9">
                  <ReactPlayer
                    controls={true}
                    url={`http://localhost:8800/${video.path}`}
                    width="100%"
                    height="100%"
                  />
                </Ratio>
                <Card.Body>
                  <Card.Text>Introduction</Card.Text>
                  <Button variant="primary">Edit Video</Button>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
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
