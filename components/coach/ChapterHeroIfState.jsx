import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import ChapterEditForm from "./ChapterEditForm";

const ChapterHeroIfNotState = ({ chapter }) => {
  return (
    <Row>
      <Col>
        <ChapterEditForm chapter={chapter} />
      </Col>
    </Row>
  );
};

ChapterHeroIfNotState.propTypes = {
  chapter: PropTypes.object,
};

export default ChapterHeroIfNotState;
