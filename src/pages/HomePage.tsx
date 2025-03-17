import { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { AudioWave } from "../components/AudioWave";
import AppContext from "../context/AppContext";
import { AudioContent } from "../types/audioTypes";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function HomePage() {
  const {
    audioContents,
    activeAudioId,
    isPlaying,
    isMixCloudVisible,
    setIsMixCloudVisible,
    handleAudioClick,
    activePage,
    setActivePage,
  } = useContext(AppContext);

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
        <p>
          La radio qui parle de <strong>tout</strong>. Mais surtout de{" "}
          <strong>vous</strong>.
        </p>
        <div className="audio-grid">
          {audioContents.map((content: AudioContent) => (
            <div key={content.id} className="audio-container">
              <h3 className="audio-title">{content.title}</h3>
              <div
                className={`audio-square ${
                  activeAudioId === content.id && isPlaying ? "playing" : ""
                }`}
                onClick={() => handleAudioClick(content)}
                style={{
                  backgroundImage: `url(${content.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="play-overlay">
                  {activeAudioId === content.id && isPlaying ? (
                    <AudioWave />
                  ) : (
                    <>
                      <FaPlay />
                      <div className="playCircle"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="audio-container">
            <h3 className="audio-title">Notre dernier mix</h3>
            <div className="mixcloud-container audio-square">
              <div
                className={`mixcloud-overlay ${
                  isMixCloudVisible ? "clicked playing" : ""
                }`}
                onClick={() => setIsMixCloudVisible(true)}
                style={{
                  backgroundImage: `url(/Urban-Radio/src/img/interview.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="play-overlay">
                  {isMixCloudVisible ? (
                    <AudioWave />
                  ) : (
                    <>
                      <FaPlay />
                      <div className="playCircle"></div>
                    </>
                  )}
                </div>
              </div>
              {isMixCloudVisible && (
                <iframe
                  width="100%"
                  height="400"
                  src="https://player-widget.mixcloud.com/widget/iframe/?autoplay=1&feed=%2FInfocoml3%2Fparole-queer-e01-paul-ginoux%2F"
                  allow="autoplay"
                ></iframe>
              )}
            </div>
          </div>
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
