import "../styles/AboutPage.css";

import { useContext } from "react";
import AppContext from "../context/AppContext";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function AboutPage() {
  const { activePage, setActivePage } = useContext(AppContext);

  const nextPage = () => {
    if (activePage === "home") setActivePage("about");
  };

  const prevPage = () => {
    if (activePage === "about") setActivePage("home");
  };

  return (
    <div className="page about-page">
      <section className="about-section">
        <div className="section-header">
          <h1>Qui sommes-nous ?</h1>
          <p>
            L'équipe qui <b>dynamise</b> vos ondes et <b>amplifie</b> vos voix
          </p>
        </div>

        <div className="about-content">
          <div className="mission-statement">
            <p>
              <strong>Urban Radio</strong> est un projet de cours ayant qu'un
              objectif : donner la parole à ceux qui font vibrer la ville.
            </p>
            <p>
              Créée pour un projet étudiant de Télécom Saint-Etienne en 2025,{" "}
              <strong>Urban Radio</strong> s'engage à vous proposer des contenus
              authentiques qui reflètent la diversité urbaine et culturelle de
              notre région.
            </p>
            <p>
              À travers une interview, un micro-trottoir et un playlist
              exclusive, nous explorons les tendances, les initiatives locales
              et les talents émergents qui façonnent notre paysage urbain.
            </p>
            <p>
              L'interview et le micro-trottoir sont réalisés par Grégoire Gsell,
              Hector Lefevre et moi-même, Rémi Asselin.
            </p>
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
