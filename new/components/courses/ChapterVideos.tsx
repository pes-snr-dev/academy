import { FaCirclePlay } from "react-icons/fa6";
import { useGetChapterVideosQuery } from "@redux/slices/chaptersSlice";
import FetchError from "@components/FetchError";
import Loader from "@components/Loader";
import NotFound from "@components/NotFound";
import { filterForVersionVideos } from "@services/chapter";
import { useEffect, useState, useMemo, useRef } from "react";
import { VIDEO_VERSION_UNION } from "@types";

type ChapterVideosProps = {
  chapterId: String;
  version: String;
  setCurrentVideo: (versionVideo: String) => void;
  setCurrentTitle: (title: String) => void;
};

const ChapterVideos = ({
  chapterId,
  version,
  setCurrentVideo,
  setCurrentTitle,
}: ChapterVideosProps) => {
  const {
    data: videos,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useGetChapterVideosQuery(chapterId);

  const [currentVideo, setMyCurrentVideo] = useState("");
  // const [versionVideos, setVersionVideos] = useState([]);
  const firstRender = useRef(true);
  const renderCount = useRef(0);

  // let versionVideos: VIDEO_VERSION_UNION[] = [];
  const versionVideos: VIDEO_VERSION_UNION[] = [];
  let memoizedVersionVideos = useMemo(() => versionVideos, []);

  if (isSuccess && videos.length > 0) {
    memoizedVersionVideos = filterForVersionVideos(version, videos);
  }

  useEffect(() => {
    renderCount.current += 1;

    if (memoizedVersionVideos?.length > 0 && renderCount.current <= 3) {
      setCurrentVideo(memoizedVersionVideos[0].path);
      setCurrentTitle(memoizedVersionVideos[0].title);
    }
  }, [setCurrentVideo, memoizedVersionVideos, setCurrentTitle]);

  function handleVideoLinkClick(path: String, title: String) {
    setCurrentVideo(path);
    setCurrentTitle(title);
  }

  if (isError) return <FetchError error={error} />;
  if (isLoading) return <Loader />;
  if (isSuccess && videos)
    return (
      <ul className="list-style-0">
        {memoizedVersionVideos.map((video, index) => (
          <li
            key={index}
            className="cursor-pointer"
            onClick={() => handleVideoLinkClick(video.path, video.title)}
          >
            <span className="d-flex align-items-center">
              <FaCirclePlay className="me-2" />{" "}
              <p className="m-0">{video.title}</p>
            </span>
          </li>
        ))}
      </ul>
    );
  if (isSuccess && videos.length < 0) return <NotFound item="Chapter Videos" />;
};

export default ChapterVideos;
