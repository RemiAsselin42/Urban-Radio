import { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import AppContext from "../context/AppContext";
import { AudioContent } from "../types/audioTypes";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function HomePage() {
  const { audioContents, openMixcloudPlayer, activePage, setActivePage } =
    useContext(AppContext);

  const nextPage = () => {
    if (activePage === "home") setActivePage("about");
  };

  const prevPage = () => {
    if (activePage === "about") setActivePage("home");
  };

  return (
    <div className="page home-page">
      <section className="audio-section">
        <h2>Nos Contenus</h2>
        <div className="audio-grid">
          {audioContents.map((content: AudioContent) => (
            <div key={content.id} className="audio-container">
              <h3 className="audio-title">{content.title}</h3>
              <div
                className={`audio-square`}
                onClick={() => openMixcloudPlayer(content.mixcloudFeed)} // Modifié ici
                style={{
                  backgroundImage: `url(${content.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="play-overlay">
                  <>
                    <FaPlay />
                    <div className="playCircle"></div>
                  </>
                </div>
              </div>
            </div>
          ))}
          {/* La section ci-dessous pour "Notre dernier mix" est maintenant gérée par le .map ci-dessus */}
          {/* 
          <div className="audio-container">
            <h3 className="audio-title">Notre dernier mix</h3>
            <div className="mixcloud-container audio-square">
              <div
                className={`mixcloud-overlay`} 
                onClick={openMixcloudPlayer} // Ceci devrait être spécifique si gardé séparément
                style={{
                  backgroundImage: `url(/Urban-Radio/interview.png)`, 
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="play-overlay">
                  <>
                    <FaPlay />
                    <div className="playCircle"></div>
                  </>
                </div>
              </div>
            </div>
          </div>
          */}
        </div>
        <div className="page-arrows">
          {activePage === "about" && (
            <div className="page-arrow left" onClick={prevPage}>
              <FaChevronLeft />
            </div>
          )}
          {activePage === "home" && (
            <div className="page-arrow right" onClick={nextPage}>
              <FaChevronRight />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
