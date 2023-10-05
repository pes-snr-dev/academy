import { FaCirclePlay } from "react-icons/fa6";
import { VIDEO_VERSION_UNION } from "@types";

type ChapterVideosProps = {
  jump: (versionVideo: VIDEO_VERSION_UNION) => void;
  versionVideos: [VIDEO_VERSION_UNION];
  chapterId: String;
};

const ChapterVideos = ({
  jump,
  versionVideos,
  chapterId,
}: ChapterVideosProps) => {
  const videos = versionVideos.filter(function (el) {
    return el.chapter === chapterId;
  });

  return (
    <ul className="list-style-0">
      {videos.map((video, index) => (
        <li key={index} className="cursor-pointer" onClick={() => jump(video)}>
          <span className="d-flex align-items-center">
            <FaCirclePlay className="me-2" />
            <p className="m-0">{video.title}</p>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ChapterVideos;
