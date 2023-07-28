import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChapterHero, VersionTabs } from "../components";
const EditChapterPage = () => {
  const { chapterId } = useParams();
  const { courseChapters } = useSelector((state) => state.courseChapters);

  let chapter = courseChapters.filter(function (el) {
    return el._id === chapterId;
  })[0];

  return (
    <>
      <ChapterHero currentChapter={chapter} chapterId={chapterId} />
      <VersionTabs />
    </>
  );
};

export default EditChapterPage;
