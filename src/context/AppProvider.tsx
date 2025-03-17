import { ReactNode, useState } from "react";
import AppContext from "./AppContext";
import { AudioContent, PageType } from "../types/audioTypes";
import { audioContents } from "../data/audioData";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentAudio, setCurrentAudio] = useState("");
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMixCloudVisible, setIsMixCloudVisible] = useState(false);
  const [activePage, setActivePage] = useState<PageType>("home");

  const handleAudioClick = (content: AudioContent) => {
    if (activeAudioId === content.id) {
      // Si c'est déjà l'audio actif, on toggle play/pause
      const audioElement = document.querySelector("audio");
      if (audioElement) {
        if (isPlaying) {
          audioElement.pause();
        } else {
          audioElement.play();
        }
      }
      setIsPlaying(!isPlaying);
    } else {
      // Si c'est un nouvel audio, on le lance
      setCurrentAudio(content.source);
      setActiveAudioId(content.id);
      setIsAudioPlayerOpen(true);
      setIsPlaying(true);
    }
  };

  const closeAudioPlayer = () => {
    setCurrentAudio("");
    setActiveAudioId(null);
    setIsAudioPlayerOpen(false);
    setIsPlaying(false);
  };

  return (
    <AppContext.Provider
      value={{
        audioContents,
        currentAudio,
        isAudioPlayerOpen,
        activeAudioId,
        isPlaying,
        isMixCloudVisible,
        activePage,
        setCurrentAudio,
        setIsAudioPlayerOpen,
        setActiveAudioId,
        setIsPlaying,
        setIsMixCloudVisible,
        setActivePage,
        handleAudioClick,
        closeAudioPlayer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
