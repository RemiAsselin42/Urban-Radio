import { useState, useEffect } from "react";
import { AudioPlayer } from "./components/AudioPlayer";
import { FaInstagram, FaTwitter, FaDiscord, FaPlay } from "react-icons/fa";
import { AudioWave } from "./components/AudioWave";
import "./App.css";
import "./footer.css";
import "./scrollDown.css";

interface AudioContent {
  id: string;
  title: string;
  source: string;
  type: "interview" | "micro-trottoir";
  image: string;
}

const audioContents: AudioContent[] = [
  {
    id: "1",
    title: "Interview avec la Mission Locale",
    source: "/Urban-Radio/audio/interview.mp3",
    type: "interview",
    image: "/Urban-Radio/src/img/interview.png",
  },
  {
    id: "2",
    title: "Micro-trottoir à Saint-Etienne",
    source: "/Urban-Radio/audio/micro-trottoir.mp3",
    type: "micro-trottoir",
    image: "/Urban-Radio/src/img/micro-trottoir.png",
  },
];

export default function App() {
  const [currentAudio, setCurrentAudio] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMixCloudVisible, setIsMixCloudVisible] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      if (isScrolling) return;

      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // Si on est dans les 100 premiers vh et qu'on scroll vers le bas
      if (scrollPosition < windowHeight && scrollPosition > 50) {
        setIsScrolling(true);
        window.scrollTo({
          top: documentHeight - windowHeight,
          behavior: "smooth",
        });
      }
      // Si on est dans les 100 derniers vh et qu'on scroll vers le haut
      else if (scrollPosition > documentHeight - windowHeight - 50) {
        setIsScrolling(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Réinitialiser l'état de scroll après l'animation
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isScrolling]);

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

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-logo">
          <img src="/Urban-Radio/src/img/logo.png" alt="Urban Radio" />
        </div>
        <nav className="header-nav">
          <a href="#accueil">Accueil</a>
          <a href="#contenus">Nos Contenus</a>
          <a href="#about">Qui sommes-nous ?</a>
        </nav>
      </header>

      <div className="logo">
        <img src="/Urban-Radio/src/img/logo.png" alt="Urban Radio" />
      </div>
      <div className="scroll-down">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
      <div className="hero"></div>

      <main className="content">
        <section className="audio-section">
          <h2>Nos Contenus</h2>
          <div className="audio-grid">
            {audioContents.map((content) => (
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
        </section>
      </main>

      <footer className="footer">
        <div className="footer-logo">
          <img src="/Urban-Radio/src/img/logo.png" alt="Urban Radio" />
        </div>
        <div className="footer-slogan">
          <p>
            La radio qui parle de <b>tout</b>. Mais surtout de <b>vous</b>.
          </p>
        </div>
        <div className="social-links">
          <a
            href="https://instagram.com/urban-radio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/urban-radio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://discord.gg/urban-radio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord />
          </a>
        </div>
      </footer>

      {currentAudio && (
        <AudioPlayer
          source={currentAudio}
          isOpen={isAudioPlayerOpen}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onClose={() => {
            setCurrentAudio("");
            setActiveAudioId(null);
            setIsAudioPlayerOpen(false);
            setIsPlaying(false);
          }}
        />
      )}
    </div>
  );
}
