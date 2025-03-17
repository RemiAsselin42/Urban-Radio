import { useState, useEffect, useContext } from "react";
import { AudioPlayer } from "./components/AudioPlayer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";
import { AppProvider } from "./context/AppProvider";
import AppContext from "./context/AppContext";
import "./App.css";
import "./footer.css";
import "./scrollDown.css";
import "./styles/PageSlider.css";

function AppContent() {
  const {
    currentAudio,
    isAudioPlayerOpen,
    isPlaying,
    setIsPlaying,
    activePage,
    setActivePage,
    closeAudioPlayer,
  } = useContext(AppContext);

  const [isScrolling, setIsScrolling] = useState(false);

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

  // Remonter en haut de la page lors du changement de page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activePage]);

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-logo">
          <img src="/Urban-Radio/src/img/logo.png" alt="Urban Radio" />
        </div>
        <nav className="header-nav">
          <a
            href="#contenus"
            onClick={(e) => {
              e.preventDefault();
              setActivePage("home");
            }}
            className={activePage === "home" ? "active" : ""}
          >
            Nos Contenus
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              setActivePage("about");
            }}
            className={activePage === "about" ? "active" : ""}
          >
            Qui sommes-nous ?
          </a>
        </nav>
      </header>

      {/* Page d'accueil */}
      {activePage === "home" && (
        <>
          <div className="logo">
            <img src="/Urban-Radio/src/img/logo.png" alt="Urban Radio" />
          </div>
          <div className="scroll-down">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </div>
          <div className="hero"></div>
        </>
      )}

      <main className="content">
        <div className="page-container">
          <div
            className="page-slider"
            style={{
              transform: `translateX(${activePage === "home" ? "0" : "-100%"})`,
            }}
          >
            <HomePage />
            <AboutPage />
          </div>
        </div>
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
            href="https://www.instagram.com/urbanfm.radio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/UrbanFM42123"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://discord.gg/sqGvkPNBjj"
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
          onClose={closeAudioPlayer}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
