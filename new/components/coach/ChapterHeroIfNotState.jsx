import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Loader from "@components/Loader";
import FetchError from "@components/FetchError";
import { useGetChapterQuery } from "@redux/slices/chaptersSlice";
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

  const currentView = {
    isLoading: <Loader />,
    isSuccess: <ChapterEditForm chapter={chapter} />,
    isError: <FetchError error={error} />,
  }[(isError, isLoading, isSuccess)];

  return (
    <Row>
      <Col>{currentView}</Col>
    </Row>
  );
};

ChapterHeroIfNotState.propTypes = {
  chapterId: PropTypes.string.isRequired,
};

export default ChapterHeroIfNotState;
