import React from 'react';
import {useTranslation} from "react-i18next";

const PastCompetition = () => {
  const [t] = useTranslation('global', {keyPrefix: "past-competition"})
  return (
    <section>
      <div className="container">
        <div className="section-content">
          <h2>{t('title')}</h2>
        </div>
      </div>
    </section>
  );
};

export default PastCompetition;
