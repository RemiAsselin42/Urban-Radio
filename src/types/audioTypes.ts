export interface AudioContent {
  id: string;
  title: string;
  type: "interview" | "micro-trottoir" | "playlist"; // Ajout de "playlist"
  image: string;
  mixcloudFeed: string; // Ajout du flux Mixcloud
}

export type PageType = "home" | "about";

export interface AppContextType {
  audioContents: AudioContent[];
  isMixCloudVisible: boolean;
  activePage: PageType;
  currentMixcloudFeed: string; // Ajout du flux Mixcloud actuel
  setIsMixCloudVisible: (isVisible: boolean) => void;
  setActivePage: (page: PageType) => void;
  openMixcloudPlayer: (feed: string) => void; // Modifié pour accepter le flux
  closeMixcloudPlayer: () => void;
}
