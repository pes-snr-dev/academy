import { Accordion } from "react-bootstrap";
import ChapterVideos from "@components/courses/ChapterVideos";
import { CHAPTER_TYPE, VIDEO_VERSION_UNION, CourseType } from "@types";

type ChaptersProps = {
  jump: (versionVideo: VIDEO_VERSION_UNION) => void;
  versionVideos: [VIDEO_VERSION_UNION];
  chapterId: String;
  course: CourseType;
};

const Chapters = ({ course, jump, versionVideos }: ChaptersProps) => {
  return (
    <Accordion defaultActiveKey={[0]} alwaysOpen>
      {course.chapters.map((chapter: CHAPTER_TYPE, index: Number) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>{chapter.title}</Accordion.Header>
          <Accordion.Body>
            <ChapterVideos
              chapterId={chapter._id}
              jump={jump}
              versionVideos={versionVideos}
            />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Chapters;
