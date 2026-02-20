import React from 'react';
import {useTranslation} from "react-i18next";
import styles from "./HowToPlay.module.scss";

const HowToPlay = () => {
  const [t] = useTranslation('global', {keyPrefix: 'how-to-play'})

  return (
    <section>
      <div className="container">
        <div className="section-content">
          <h2 className={styles.title}>{t('title')}</h2>
          <div className={styles['card-container']}>
            {[...Array(4)].map((_, index) => (
              <div className={styles.card} key={index}>
                <h3><b className={styles['index-card']}>{t('step')} {index + 1}:</b> {t(`section-${index + 1}.title`)}
                </h3>
                <p>{t(`section-${index + 1}.1`)}<br className="br-htp"/> {t(`section-${index + 1}.2`)}</p>
              </div>
            ))}
          </div>
          <div className={styles['tip-container']}>
            <h4>{t('tip')}</h4>
            <p>{t('pro-tip-1')}<br/><br/>{t('pro-tip-2')}</p>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HowToPlay;
