import { Accordion } from "react-bootstrap";
import ChapterVideos from "@components/courses/ChapterVideos";
import { CHAPTER_TYPE } from "@types";

const Chapters = ({ course, setCurrentVideo, setCurrentTitle }) => {
  return (
    <Accordion defaultActiveKey={[0]} alwaysOpen>
      {course.chapters.map((chapter: CHAPTER_TYPE, index: Number) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>{chapter.title}</Accordion.Header>
          <Accordion.Body>
            <ChapterVideos
              chapterId={chapter._id}
              version="en"
              setCurrentVideo={setCurrentVideo}
              setCurrentTitle={setCurrentTitle}
            />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Chapters;
