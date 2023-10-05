"use client";
import ChapterHero from "@components/coach/ChapterHero";
import VersionTabs from "@components/coach/VersionTabs";

const EditChapterPage = ({ params }) => {
  const chapterId = params.id;

  return (
    <>
      <ChapterHero chapterId={chapterId} />
      <VersionTabs chapterId={chapterId} />
    </>
  );
};

export default EditChapterPage;
