import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useEffect, useRef, useState} from "react";

import LanguageChanger from "./ui/LanguageChanger/LanguageChanger.jsx";

import styles from "./NavBar.module.scss";
import logo from "../../assets/images/logo.png";
// import bgLogo from "../../assets/images/bg-logo.png";


const NavBar = () => {
  const [t] = useTranslation("global", {keyPrefix: 'navbar'});
  const [ open, setOpen ] = useState(false);

  let linkRef = useRef();
  let languageChangerRef = useRef();
  let linkContainer = useRef();


  useEffect(() => {
    window.addEventListener("resize", () => setOpen(false));

    let handler = e => {
      if(linkContainer.current.contains(e.target) && !linkRef.current.contains(e.target) && !languageChangerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handler);

    return() => {
      window.removeEventListener("click", setOpen(false));
    }
  }, []);

  return (
    <nav className={styles['navbar-container']}>
      <div className="container">
        <div className={styles['content-container']}>
          <NavLink to="/" className={styles['icon-container']}>
            <img src={logo} alt="Costa Facility"/>
          </NavLink>
          <div className={`${styles['navbar-content']} ${open && styles['open']}`}>
            <div ref={linkContainer} className={styles['links-container']}>
              <NavLink to="/current-competition">
                {t("current-competition")}
              </NavLink>
              {/*<NavLink to="/past-competition">*/}
              {/*  {t("past-competition")}*/}
              {/*</NavLink>*/}
              <NavLink to="/how-to-play">
                {t("how-to-play")}
              </NavLink>
              {/*<img className={styles['bg-logo']} src={bgLogo} alt="logo" />*/}
            </div>
            <div ref={languageChangerRef} className={styles['language-container']}>
              <LanguageChanger  />
            </div>
          </div>

        </div>
        <div ref={linkRef} onClick={() => setOpen(!open)} className={`${styles['nav-hamburger']} ${open && styles['open']}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
