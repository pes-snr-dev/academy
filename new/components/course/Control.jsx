import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaExpand,
  FaCompress,
  FaToggleOn,
  FaToggleOff,
  FaCog,
} from "react-icons/fa";
import { FaRotateRight, FaRotateLeft } from "react-icons/fa6";
import { ClassNames, classNames } from "@utils/styles";

const Control = ({
  title,
  isHovered,
  isPlaying,
  volume,
  handleVolumeChange,
  played,
  onSeek,
  onSeekMouseUp,
  handleBack,
  handlePlayPause,
  handleNext,
  timeRemaining,
  handleToggleFullScreen,
  isFullScreen,
}) => {
  return (
    <div className={classNames("controls p-2", isHovered ? "show" : "hide")}>
      <div className="upper-controls d-flex align-items-center">
        <div className="progress-bar w-100 flex-grow-1">
          <input
            type="range"
            min="0"
            max="100"
            value={played * 100}
            onChange={onSeek}
            onMouseUp={onSeekMouseUp}
            style={{ width: "100%" }}
          />
        </div>
        <span className="time-remaining text-end text-white">
          {timeRemaining}
        </span>
      </div>
      <div className="lower-controls d-flex justify-content-between">
        <div className="initial">
          <button onClick={handleBack}>
            <FaRotateLeft />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleNext}>
            <FaRotateRight />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>
        <div className="middle text-white flex-grow-1 text-center">
          <p>{title}</p>
        </div>
        <div className="end d-flex justify-content-end">
          <button onClick={handleToggleFullScreen}>
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
        {/* <button onClick={handleToggleFullScreen}>
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </button>
        <button onClick={handleToggleAutoplay}>
          {isAutoplay ? <FaToggleOn /> : <FaToggleOff />}
        </button> */}
        {/* <select value={quality} onChange={handleQualityChange}>
          <option value="auto">Auto</option>
          <option value="720">720p</option>
          <option value="480">480p</option>
        </select> */}
        {/* <button onClick={handleToggleCaptions}>
          {captions ? "Disable Captions" : "Enable Captions"}
        </button> */}
        {/* <select
          value={captionsPosition}
          onChange={handleCaptionsPositionChange}
        >
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select> */}
      </div>
    </div>
  );
};

export default Control;
