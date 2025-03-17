import { createContext, ReactNode, useState } from "react";

export interface AudioContent {
  id: string;
  title: string;
  source: string;
  type: "interview" | "micro-trottoir";
  image: string;
}

interface AppContextType {
  audioContents: AudioContent[];
  currentAudio: string;
  isAudioPlayerOpen: boolean;
  activeAudioId: string | null;
  isPlaying: boolean;
  isMixCloudVisible: boolean;
  activePage: "home" | "about";
  setCurrentAudio: (source: string) => void;
  setIsAudioPlayerOpen: (isOpen: boolean) => void;
  setActiveAudioId: (id: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsMixCloudVisible: (isVisible: boolean) => void;
  setActivePage: (page: "home" | "about") => void;
  handleAudioClick: (content: AudioContent) => void;
  closeAudioPlayer: () => void;
}

export const audioContents: AudioContent[] = [
  {
    id: "1",
    title: "Interview avec la Mission Locale",
    source: "/audio/interview.mp3",
    type: "interview",
    image: "/src/img/interview.png",
  },
  {
    id: "2",
    title: "Micro-trottoir à Saint-Etienne",
    source: "/audio/micro-trottoir.mp3",
    type: "micro-trottoir",
    image: "/src/img/micro-trottoir.png",
  },
];

const AppContext = createContext<AppContextType>({} as AppContextType);

export default AppContext;

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentAudio, setCurrentAudio] = useState("");
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMixCloudVisible, setIsMixCloudVisible] = useState(false);
  const [activePage, setActivePage] = useState<"home" | "about">("home");

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
