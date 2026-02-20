import React from 'react';
import PropTypes from 'prop-types';

import {useTranslation, Trans} from "react-i18next";

import logo from "../../assets/images/logo.png"
import styles from "./Home.module.scss";

const Home = () => {
  const [t, i18n] = useTranslation('global', {keyPrefix: 'home'})

  return (
    <>
      <header className={styles.header}>
        <img src="/header.png" className="header-image" alt="header photo"/>
        <img src="/mobile-header.png" className="mobile-header-image" alt="header photo"/>
        <div className={`container`}>
          <img className={styles.logo} src={logo} alt="lucky-money"/>
          <h1 id="services" className={styles['header-title']}><Trans ns="global" i18nKey="home.title" /></h1>
          <p>{t('description')}</p>
        </div>
      </header>
      <main>
        <section>
          <div className="container">
            <h2 className={styles.header2}>{t("how-to-play.title")}</h2>
            <div className={styles['card-container']}>
              {[...Array(4)].map((_, index) => (
                <div className={styles.cards} key={index}>
                  <h3><b className={styles['index-card']}>{index +1}.</b> {t(`how-to-play.${index + 1}.subtitle`)}</h3>
                  <p>{t(`how-to-play.${index + 1}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

Home.propTypes = {};

export default Home;
