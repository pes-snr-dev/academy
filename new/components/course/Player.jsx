import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { formatTime } from "@utils/misc";
import "./Player.css";

import Control from "./Control";

const VideoPlayer = ({ videoUrl, title }) => {
  const playerRef = useRef(null);

  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(0.8);
  const [isFullScreen, setisFullScreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [captions, setCaptions] = useState(false);
  const [captionsPosition, setCaptionsPosition] = useState("bottom");

  const [videoState, setVideoState] = useState({
    isPlaying: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true,
  });
  const { isPlaying, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const timeRemaining = formatTime(duration - currentTime);

  // alert(timeRemaining);

  const handlePlayPause = () => {
    setVideoState({ ...videoState, isPlaying: !videoState.isPlaying });
  };

  const handleBack = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleNext = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleVolumeChange = (value) => {
    setVideoState({ ...videoState, volume: parseFloat(value) });
  };

  const handleToggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  };

  const handleQualityChange = (e) => {
    setQuality(e.target.value);
  };

  const handleToggleCaptions = () => {
    setCaptions(!captions);
  };

  const handleCaptionsPositionChange = (e) => {
    setCaptionsPosition(e.target.value);
  };

  function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  const [isHovered, setIsHovered] = useState(false);

  const seekHandler = (e) => {
    setVideoState({ ...videoState, played: parseFloat(e.target.value) / 100 });
  };

  const seekMouseUpHandler = (event) => {
    setVideoState({ ...videoState, seeking: false });
    const player = playerRef.current;
    player.seekTo(played);
  };

  const progressHandler = (state) => {
    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const handle = useFullScreenHandle();

  const handleToggleFullScreen = () => {
    setisFullScreen((isFullScreen) => !isFullScreen);
    if (!isFullScreen) {
      handle.enter();
    } else {
      handle.exit();
    }
  };

  const [isMouseVisible, setIsMouseVisible] = useState(true);

  useEffect(() => {
    let timeout;

    const handleMouseMove = () => {
      setIsMouseVisible(true);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsMouseVisible(false);
        setIsHovered(false);
      }, 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <FullScreen handle={handle}>
      <div
        className="player-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: isMouseVisible ? "auto" : "none" }}
        onClick={handlePlayPause}
      >
        <ReactPlayer
          onProgress={progressHandler}
          onContextMenu={handleContextMenu}
          controls={true}
          ref={playerRef}
          url={videoUrl}
          playing={isPlaying}
          volume={volume}
          muted={muted}
          className="react-player"
          width="100%"
          height="100%"
          config={{
            file: {
              attributes: {
                autoPlay: isAutoplay,
                controls: false,
                muted: false,
                disablePictureInPicture: true,
              },
              tracks: captions
                ? [
                    {
                      kind: "captions",
                      src: "url-to-captions-file",
                      srcLang: "en",
                      label: "English",
                      default: true,
                    },
                    // Add more caption tracks as needed
                  ]
                : [],
            },
          }}
        />
        <Control
          isHovered={isHovered}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          volume={volume}
          played={played}
          onSeek={seekHandler}
          onSeekMouseUp={seekMouseUpHandler}
          handleBack={handleBack}
          handleNext={handleNext}
          handleVolumeChange={handleVolumeChange}
          timeRemaining={timeRemaining}
          title={title}
          isFullScreen={isFullScreen}
          handleToggleFullScreen={handleToggleFullScreen}
        />
      </div>
    </FullScreen>
  );
};

export default VideoPlayer;
