import { ReactNode, useState } from "react";
import AppContext from "./AppContext";
import { PageType } from "../types/audioTypes";
import { audioContents } from "./AppContext";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isMixCloudVisible, setIsMixCloudVisible] = useState(false);
  const [activePage, setActivePage] = useState<PageType>("home");
  // Initialiser avec le flux de la playlist par défaut ou le premier élément
  const [currentMixcloudFeed, setCurrentMixcloudFeed] = useState<string>(
    audioContents.find((content) => content.type === "playlist")
      ?.mixcloudFeed || "/Infocoml3/playlist-urban-radio/"
  );

  const openMixcloudPlayer = (feed: string) => {
    setCurrentMixcloudFeed(feed);
    setIsMixCloudVisible(true);
  };

  const closeMixcloudPlayer = () => {
    setIsMixCloudVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        audioContents,
        isMixCloudVisible,
        activePage,
        currentMixcloudFeed, // Fournir le flux actuel
        setIsMixCloudVisible,
        setActivePage,
        openMixcloudPlayer, // Fournir la fonction mise à jour
        closeMixcloudPlayer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
