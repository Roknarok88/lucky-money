import React from 'react';
import styles from "./Footer.module.scss"
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import card_apple from "../../assets/images/icons/card-apple.png";
import card_google from "../../assets/images/icons/card-google.png";
import card_mastercard from "../../assets/images/icons/card-mastercard.png";
import card_visa from "../../assets/images/icons/card-visa.png";

import facebook from "../../assets/images/icons/facebook.svg";
import instagram from "../../assets/images/icons/instagram.svg"
import tiktok from "../../assets/images/icons/tiktok.svg"
import youtube from "../../assets/images/icons/youtube.svg"



const Footer = () => {

  const [t, i18n] = useTranslation('global', {keyPrefix: 'footer'})

  return (
    <footer className={styles['footer']}>
      <div className="container">
        <div className={styles['footer-container']}>
          <img src={logo} alt="lucky-money" />
          <div className={styles['social-container']}>
            <a target="_blank" rel="noopener" href="https://localhost:8080">
              <img alt="facebook" src={facebook} />
            </a>
            <a target="_blank" rel="noopener" href="https://localhost:8080">
              <img  src={instagram} />
            </a>
            <a target="_blank" rel="noopener" href="https://localhost:8080">
              <img  src={tiktok} />
            </a>
            <a target="_blank"  rel="noopener" href="https://localhost:8080">
              <img src={youtube}/>
            </a>
          </div>
          <div className={styles['cc-container']}>
            <img alt="apple pay" src={card_apple}/>
            <img alt="google-pay" src={card_google}/>
            <img alt="mastercard" src={card_mastercard}/>
            <img alt="visa" src={card_visa}/>
          </div>
          <span>Lucky Money © 2026</span>
          <NavLink to={"/terms-and-conditions"}>{t('terms')} </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
