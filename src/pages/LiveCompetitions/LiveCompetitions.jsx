import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import styles from "./LiveCompetitions.module.scss";
import {competitionImages} from "../../utils/competitionImages.js";
import ticketIcon from "../../assets/images/icons/ticket.svg";


const LiveCompetitions = () => {

  const [competitions, setCompetitions] = useState();
  const [noCompetition, setNoCompetition] = useState();

  const [t] = useTranslation('global', {keyPrefix: 'live-competitions'})

  useEffect(() => {
    const loadCompetition = async () => {
      try {
        const res = await fetch('/api/v1/competitions');
        const competitions = await res.json();

        if (!competitions.length) {
          setNoCompetition(true);
          return
        }

        setCompetitions(competitions);
      } catch (err) {
        setNoCompetition(true);
        throw new Error(err)
      }

    };

    loadCompetition();
  }, []);

  function CompetitionCard({id, name, ticket_price, tickets_remaining}) {
    const images = competitionImages[id] || [];
    const firstImage = images[0];

    return (
      <NavLink className={styles['competition-card']} to={`/live-competitions/${id}`}>
        <div>
          <img src={firstImage} alt=""/>
          <div className={styles['card-description']}>
            <p className={styles['card-name']}>{name}</p>
            <div className={styles['card-details-container']}>
              <div className={styles['details']}>
                <img src={ticketIcon} alt="tickets"/>
                <span>{(ticket_price / 100).toFixed(2)} €</span>
              </div>
              <div className={styles['details']}>
                <img src={ticketIcon} alt="tickets"/>
                <span>{tickets_remaining.toLocaleString()}</span>
              </div>

            </div>
          </div>


        </div>
      </NavLink>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="section-content">
          {noCompetition && <div className={styles['no-competition-container']}>
            <h2>{t('no-competition.title')}</h2>
            <p>{t('no-competition.description')}</p>
          </div>}
          {
            !noCompetition && <>
              <h2 className={styles.title}>{t('title')}</h2>
              <div className={styles['competitions-container']}>
                {competitions?.map(comp =>
                  CompetitionCard(comp))}

              </div>
            </>
          }
        </div>
      </div>
    </section>
  );
};

export default LiveCompetitions;
