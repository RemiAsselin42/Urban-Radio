import { createContext, ReactNode } from "react";

// AudioContent mis à jour ici aussi
export interface AudioContent {
  id: string;
  title: string;
  type: "interview" | "micro-trottoir" | "playlist"; // Ajout de "playlist"
  image: string;
  mixcloudFeed: string; // Ajout du flux Mixcloud
}

interface AppContextType {
  audioContents: AudioContent[];
  isMixCloudVisible: boolean;
  activePage: "home" | "about";
  currentMixcloudFeed: string; // Ajout du flux Mixcloud actuel
  setIsMixCloudVisible: (isVisible: boolean) => void;
  setActivePage: (page: "home" | "about") => void;
  openMixcloudPlayer: (feed: string) => void; // Modifié pour accepter le flux
  closeMixcloudPlayer: () => void;
}

export const audioContents: AudioContent[] = [
  {
    id: "1",
    title: "Interview avec Nora Othman",
    type: "interview",
    image: "/Urban-Radio/interview.png",
    mixcloudFeed: "/Infocoml3/urban-radio-linterview-avec-nora-othman/",
  },
  {
    id: "2",
    title: "Micro-trottoir à Saint-Etienne",
    type: "micro-trottoir",
    image: "/Urban-Radio/micro-trottoir.png",
    mixcloudFeed: "/Infocoml3/urban-radio-micro-trottoir/",
  },
  {
    id: "3",
    title: "Notre playlist musicale",
    type: "playlist",
    image: "/Urban-Radio/playlist.png",
    mixcloudFeed: "/Infocoml3/playlist-urban-radio/",
  },
];

const AppContext = createContext<AppContextType>({} as AppContextType);

export default AppContext;

// AppProvider est maintenant dans son propre fichier, mais si on le garde ici pour la définition de audioContents :
// La définition de AppProvider sera mise à jour dans son propre fichier.
// Cette section est juste pour montrer la mise à jour de `audioContents` si elle était définie ici.
// La logique de AppProvider sera dans src/context/AppProvider.tsx
export function AppProvider({ children }: { children: ReactNode }) {
  // ... la logique de AppProvider sera mise à jour dans son fichier dédié ...
  // Pour l'instant, on s'assure que AppContext est correctement typé et exporté.
  // Le reste de la logique (useState, fonctions) est dans AppProvider.tsx
  return (
    <AppContext.Provider
      value={
        {
          /* valeurs mises à jour dans AppProvider.tsx */
        } as AppContextType
      }
    >
      {children}
    </AppContext.Provider>
  );
}
