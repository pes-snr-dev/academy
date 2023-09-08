import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Loader from "@components/Loader";
import FetchError from "@components/FetchError";
import { useGetChapterQuery } from "@redux/slices/chaptersSlice";
import ChapterEditForm from "./ChapterEditForm";

const ChapterHero = ({ chapterId }) => {
  const {
    data: chapter,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChapterQuery(chapterId, {
    refetchOnMountOrArgChange: true,
  });

  console.log(chapter, chapterId);

  // alert(chapterId);

  // const currentView = {
  //   isLoading: <Loader />,
  //   isSuccess: <ChapterEditForm chapter={chapter} />,
  //   isError: <FetchError error={error} />,
  // }[(isError, isLoading, isSuccess)];

  // return (
  // <Row>
  //   <Col>{currentView}</Col>
  // </Row>
  // );

  if (isLoading) return <Loader />;
  else if (isSuccess)
    return (
      <Row>
        <Col>
          <ChapterEditForm chapter={chapter} />
        </Col>
      </Row>
    );
  else if (isError) return <FetchError error={error} />;
};

ChapterHero.propTypes = {
  currentChapter: PropTypes.object,
  chapterId: PropTypes.string.isRequired,
};

export default ChapterHero;
