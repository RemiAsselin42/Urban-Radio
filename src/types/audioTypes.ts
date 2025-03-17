export interface AudioContent {
  id: string;
  title: string;
  source: string;
  type: "interview" | "micro-trottoir";
  image: string;
}

export type PageType = "home" | "about";

export interface AppContextType {
  audioContents: AudioContent[];
  currentAudio: string;
  isAudioPlayerOpen: boolean;
  activeAudioId: string | null;
  isPlaying: boolean;
  isMixCloudVisible: boolean;
  activePage: PageType;
  setCurrentAudio: (source: string) => void;
  setIsAudioPlayerOpen: (isOpen: boolean) => void;
  setActiveAudioId: (id: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsMixCloudVisible: (isVisible: boolean) => void;
  setActivePage: (page: PageType) => void;
  handleAudioClick: (content: AudioContent) => void;
  closeAudioPlayer: () => void;
}
