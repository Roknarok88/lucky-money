import React from 'react';
import styles from "./PaymentSuccess.module.scss";
import {Trans, useTranslation} from "react-i18next";

const PaymentSuccess = () => {
  const params = new URLSearchParams(window.location.search);
  const tickets = params.get("tickets");
  const email = params.get("email");

  const [t] = useTranslation('global', {keyPrefix: "payment-success"})

  return (
    <section>
      <div className="container">
        <div className="section-content">
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>
            <Trans
              ns="global"
              i18nKey="payment-success.description"
              values={{tickets, email}}
              components={{
                b: <b/>,
                br: <br/>
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
