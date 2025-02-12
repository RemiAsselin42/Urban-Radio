import { useRef, useState, useEffect, useCallback } from "react";
import {
  FaBackward,
  FaForward,
  FaPlay,
  FaPause,
  FaStop,
  FaVolumeUp,
  FaTimes,
} from "react-icons/fa";
import "./AudioPlayer.css";

interface AudioPlayerProps {
  source: string;
  isOpen: boolean;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onClose: () => void;
}

export function AudioPlayer({
  source,
  isOpen,
  isPlaying,
  setIsPlaying,
  onClose,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isEnded) {
      audio.currentTime = 0;
      setIsEnded(false);
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, isEnded, setIsPlaying]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowLeft") {
        handleBackward();
      } else if (e.code === "ArrowRight") {
        handleForward();
      } else if (e.code === "Escape") {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose, togglePlay, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = source;
    audio.load();
    setIsPlaying(false);

    if (isOpen) {
      setIsVisible(true);
    }

    return () => {
      audio.pause();
      setIsPlaying(false);
    };
  }, [source, isOpen, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      console.log("Durée chargée:", audio.duration);
      setDuration(audio.duration);
    };
    const handleError = (e: ErrorEvent) => {
      console.error("Erreur audio:", e);
    };
    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setIsPlaying]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (audioRef.current) {
        audioRef.current.src = source;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, source, setIsPlaying]);

  if (!isVisible && !isOpen) return null;

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const newTime = percentage * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setIsEnded(false);

      if (!isPlaying || audioRef.current.ended || audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Erreur lors de la lecture:", error);
          });
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`audio-player ${!isOpen ? "hidden" : ""}`}>
      <audio ref={audioRef} preload="metadata" />
      <div className="controls-wrapper">
        <div className="progress-container">
          <div className="progress-bar" onClick={handleProgressClick}>
            <div
              className="progress"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
        </div>

        <div className="controls">
          <button onClick={handleBackward} title="Reculer de 10 secondes">
            <FaBackward />
          </button>
          <button
            onClick={togglePlay}
            title={isEnded ? "Recommencer" : isPlaying ? "Pause" : "Lecture"}
          >
            {isEnded ? <FaStop /> : isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleForward} title="Avancer de 10 secondes">
            <FaForward />
          </button>

          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div className="volume-control">
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>

          <button className="close-button" onClick={onClose} title="Fermer">
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}
