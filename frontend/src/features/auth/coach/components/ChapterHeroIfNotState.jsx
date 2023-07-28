import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

import Loader from "../../../../components/Loader";
import { useGetChapterQuery } from "../../../../slices/chaptersSlice";
import ChapterEditForm from "./ChapterEditForm";

const ChapterHeroIfNotState = ({ chapterId }) => {
  const {
    data: chapter,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChapterQuery(chapterId, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Row>
      <Col>
        {isLoading && <Loader />}
        {isSuccess && (
          <>
            <ChapterEditForm chapter={chapter} />
          </>
        )}
        {isError && (
          <div className="alert alert-danger" role="alert">
            {error?.data?.message || error.error || "Something went wrong!"}
          </div>
        )}
      </Col>
    </Row>
  );
};

ChapterHeroIfNotState.propTypes = {
  chapterId: PropTypes.string.isRequired,
};

export default ChapterHeroIfNotState;
