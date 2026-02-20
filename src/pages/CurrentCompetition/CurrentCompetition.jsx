import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import {useTranslation, Trans} from "react-i18next";
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import EmailForm from "./components/EmailForm/EmailForm.jsx";
import Countdown from 'react-countdown';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from "./CurrentCompetition.module.scss";
import personIcon from "../../assets/images/icons/person.svg";
import ticketIcon from "../../assets/images/icons/ticket.svg";

import { competitionImages} from "../../utils/competitionImages.js";

const CurrentCompetition = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [t, i18n] = useTranslation('global', {keyPrefix: "current-competition"})
  const [competitionEnded, setCompetitionEnded] = useState(false);
  const [noCompetition, setNoCompetition] = useState(false);
  const [maxTicket, setMaxTicket] = useState(0);
  const [maxTicketPerson, setMaxTicketPerson] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(3.50);
  const [compName, setCompName] = useState("");
  const [compEnds, setCompEnds] = useState(null);
  const [compDescription, setCompDescription] = useState(null);
  const { id } = useParams();
  const images = competitionImages[id] || [];



  useEffect(() => {
    const loadCompetition = async () => {
      try {
        const res = await fetch(`/api/v1/competitions/${id}`);
        const competition = await res.json();

        if (Object.keys(competition).length <= 0) {
          setNoCompetition(true);
          return
        }
        setCompetitionEnded(false);

        setMaxTicket(competition?.max);
        setMaxTicketPerson(competition?.user_max);
        setTicketsSold(competition?.tickets_sold);
        setTicketPrice(Number(competition?.ticket_price / 100).toFixed(2));
        setCompName(competition?.name)
        setCompEnds(competition?.ends_at);
        setCompDescription(competition?.description);


        if (competition?.tickets_sold >= competition?.max) {
          setCompetitionEnded(true);
        }
      } catch (err) {
        setNoCompetition(true);
        throw new Error(err)
      }

    };

    loadCompetition();
  }, []);

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      // Render a completed state
      setCompetitionEnded(true);
    } else {
      // Render a countdown
      return <div className={styles.counter}>
        <div>
          <span>{days}</span>
          <span>{t('countdown.days')}</span>
        </div>
        <div>
          <span>{hours}</span>
          <span>{t('countdown.hours')}</span>
        </div>
        <div>
          <span>{minutes}</span>
          <span>{t('countdown.minutes')}</span>
        </div>
        <div>
          <span>{seconds}</span>
          <span>{t('countdown.seconds')}</span>
        </div>
      </div>
    }
  };

  const handleSetValidationEmail = () => {
    setIsValid(true);
  }

  return (<section>
    <div className="container">
      <div className="section-content">
        {noCompetition && <div className={styles['no-competition-container']}>
          <h2>{t('no-competition.title')}</h2>
          <p>{t('no-competition.description')}</p>
        </div>}
        {!noCompetition && <div className={styles['competition-container']}>
          <div className={styles['grid-item']}>
            <div className={styles['swiper-container']}>
              <Swiper
                loop
                spaceBetween={10}
                navigation={true}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.swiper}
              >
                {images.map((src, i) =>   <SwiperSlide key={i} className={styles.slide}>
                  <img src={src} alt="photo competition"/>
                </SwiperSlide>)}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper2"
              >
                {images.map((src, i) =>   <SwiperSlide key={i} className={styles.slide}>
                  <img src={src} alt="photo competition"/>
                </SwiperSlide>)}
              </Swiper>
            </div>
          </div>
          <div className={styles['grid-item']}>
            <div className={styles['competition-details']}>
              <h2 className={styles['header']}>{t('competition.title', {name: compName})}</h2>
              {competitionEnded && <div className={styles['competition-ended']}>
                <p>
                  <Trans
                    ns="global"
                    i18nKey="current-competition.competition.competition-ended"
                  />
                </p>
              </div>}
              {!competitionEnded && <>
                <p className={styles['timer-info']}>{t('competition.competition-ends')}</p>
                <Countdown renderer={renderer} date={new Date(compEnds)}/>
                <p>{t("competition.competition-ends-2")}</p>
                <div className={styles['ticket-container']}>
                  <div className={styles['ticket-entries']}>
                    <div>
                      <img src={ticketIcon} alt="tickets"/>
                      <span>
                        <b>{maxTicket}</b> {t('ticket-entry.total-entries')}
                      </span>
                    </div>
                    <div>
                      <img src={personIcon} alt="person"/>
                      <span><b>{maxTicketPerson}</b> {t('ticket-entry.max-tickets')}</span>
                    </div>
                  </div>
                  <div className={styles['tickets-bought']}>
                    <div className={styles['progress-bar']}>
                      <div style={{width: `${((ticketsSold / maxTicket) * 100)}%`}}></div>
                    </div>
                    <p><b>{ticketsSold}</b> {t('ticket-entry.tickets-sold')} </p>
                    <h3 className={styles['price-container']}>{t('price')}: €{ticketPrice}</h3>

                  </div>
                  {!isValid && <p className={styles['email-info']}>{t('email-info')}</p>}
                  <EmailForm id={id} setValidationEmail={handleSetValidationEmail}/>
                </div>
              </>
              }
            </div>
          </div>
        </div>}
      </div>
    </div>
  </section>);
};

export default CurrentCompetition;
