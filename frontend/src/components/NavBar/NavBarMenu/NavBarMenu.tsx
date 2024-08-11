import { useState, useEffect } from "react";
import { BuildWith } from "src/components/BuildWith/BuildWith";
import { NavBarBtn } from "../NavBarBtn/NavBarBnt";
import { AboutContent } from "src/components/AboutContent/AboutContent";
import { ContactContent } from "src/components/ContactContent/ContactContent";
import "./NavBarMenu.css";
import { ThemeChanger } from "src/components/ThemeChanger/ThemeChanger";
import { useTheme } from "src/context/ThemeContext";

export const NavBarMenu = () => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 480);
  const { darkTheme } = useTheme();

  const toggleModal = (content: React.ReactNode | null) => {
    setModalContent(content);
    if (content) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 480);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar_menu">
      <ThemeChanger />
      {isMobileView ? (
        <>
          <button className="menu_button" onClick={toggleMenu}>
            <div className="fa-solid fa-bars"></div> <span>Menu</span>
          </button>
          {isMenuOpen && (
            <div className={`overlay ${darkTheme ? "dark-theme" : ""}`} onClick={() => setIsMenuOpen(false)}>
              <div className={`modal-content ${darkTheme ? "dark-theme" : ""}`} onClick={e => e.stopPropagation()}>
                <div className="modal-content-menu">
                  <NavBarBtn
                    icon="phone"
                    text="Contact"
                    onClick={() => {
                      toggleModal(<ContactContent onClick={() => toggleModal(null)} />);
                      setIsMenuOpen(false);
                    }}
                  />
                  <NavBarBtn
                    icon="desktop"
                    text="About"
                    onClick={() => {
                      toggleModal(<AboutContent onClick={() => toggleModal(null)} />);
                      setIsMenuOpen(false);
                    }}
                  />
                  <NavBarBtn
                    icon="gear"
                    text="Stack"
                    onClick={() => {
                      toggleModal(<BuildWith onClick={() => toggleModal(null)} />);
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <NavBarBtn
            icon="phone"
            text="Contact"
            onClick={() => toggleModal(<ContactContent onClick={() => toggleModal(null)} />)}
          />
          <NavBarBtn
            icon="desktop"
            text="About"
            onClick={() => toggleModal(<AboutContent onClick={() => toggleModal(null)} />)}
          />
          <NavBarBtn
            icon="gear"
            text="Stack"
            onClick={() => toggleModal(<BuildWith onClick={() => toggleModal(null)} />)}
          />
        </>
      )}
      {modalContent && (
        <div className="modal-wrapper" onClick={() => toggleModal(null)}>
          {modalContent}
        </div>
      )}
    </div>
  );
};
