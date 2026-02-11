import {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import styles from "./LanguageChanger.module.scss";

const LanguageChanger = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [language, setLanguage] = useState('en');
  const [t, i18n] = useTranslation("global");

  let menuRef = useRef();

  const handlerChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  useEffect(() => {
    let handler = e => {
      if(!menuRef.current.contains(e.target)) {
        setToggleDropdown(false);
      }
    }

    document.addEventListener("mousedown", handler);

    return() => {
      document.removeEventListener("mousedown", handler);
    }
  }, []);

  return (
    <div ref={menuRef} onClick={() => setToggleDropdown(!toggleDropdown)}  className={styles['language-changer']}>
      <div className={styles['language-container']}>
        <img src={`/flags/${language}-flag.svg`} className={styles['selected-language']}  alt="EN"/>
      </div>
      <div className={clsx(styles['dropdown'], {[styles['active']]: toggleDropdown})}>
        <span onClick={() => handlerChangeLanguage('en')}><img src="/flags/en-flag.svg" alt="EN" />English</span>
        <span onClick={() => handlerChangeLanguage('es')}><img src="/flags/es-flag.svg" alt="ES" />Español</span>
        <span onClick={() => handlerChangeLanguage('de')}><img src="/flags/de-flag.svg" alt="DE" />Deutsch</span>
      </div>
    </div>
  );
};

export default LanguageChanger;
