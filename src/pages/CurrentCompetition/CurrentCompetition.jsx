import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import EmailForm from "./components/EmailForm/EmailForm.jsx";
import Countdown from 'react-countdown';
import {useTranslation} from "react-i18next";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from "./CurrentCompetition.module.scss";
import photo1 from "../../assets/images/competition/photo1.jpg";
import photo2 from "../../assets/images/competition/photo2.jpg";
import photo3 from "../../assets/images/competition/photo3.jpg";
import photo4 from "../../assets/images/competition/photo4.jpg";
import personIcon from "../../assets/images/icons/person.svg";
import ticketIcon from "../../assets/images/icons/ticket.svg";

const CurrentCompetition = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [t, i18n] = useTranslation('global', {keyPrefix: "current-competition"})
  const [competitionEnded, setCompetitionEnded] = useState(false);
  const [maxTicket, setMaxTicket] = useState(0);
  const [maxTicketPerson, setMaxTicketPerson] = useState(600);
  const [ticketsSold, setTicketsSold] = useState(12000);
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {
    const loadMaxTickets = () => {
      // API call later
      setMaxTicket(60000);
    };

    loadMaxTickets();
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

  return (
    <section>
      <div className="container">
        <div className="section-content">

          <div className={styles['competition-container']}>
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
                <SwiperSlide className={styles.slide}>
                  <img src={photo1} alt="photo competition"/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <img src={photo2} alt="photo competition"/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <img src={photo3} alt="photo competition"/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <img src={photo4} alt="photo competition"/>
                </SwiperSlide>
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
                <SwiperSlide className={styles.slide}>
                  <img src={photo1} alt="photo competition"/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <img src={photo2} alt="photo competition"/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <img src={photo3} alt="photo competition"/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <img src={photo4} alt="photo competition"/>
                </SwiperSlide>
              </Swiper>
              </div>
            </div>
            <div className={styles['grid-item']}>
              {isValid && <div className={styles['competition-details']}>
                "test"
              </div>}
              {!isValid && <div className={styles['competition-details']}>
                <h2 className={styles['header']}>{t('competition.title')}</h2>
                <p className={styles['timer-info']}>{t('competition.competition-ends')}</p>
                <Countdown renderer={renderer} date={new Date(2026, 2, 20, 23, 59)}/>
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
                    <h3 className={styles['price-container']}>{t('price')}: €2.50</h3>

                  </div>
                  <p className={styles['email-info']}>{t('email-info')}</p>
                  <EmailForm setValidationEmail={handleSetValidationEmail} />
                </div>
              </div> }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentCompetition;
