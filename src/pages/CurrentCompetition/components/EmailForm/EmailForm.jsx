import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import styles from "./EmailForm.module.scss";
import {useTranslation} from "react-i18next";

const EmailForm = ({setValidationEmail, id}) => {

  const [t] = useTranslation('global', {keyPrefix: "email-form"})
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userTickets, setUserTickets] = useState(0);
  const [userMaxTickets, setUserMaxTickets] = useState(0);
  const [userCanBuy, setUserCanBuy] = useState(0);
  const [buyError, setBuyError] = useState();

  const EmailSchema = Yup.object({
    email: Yup.string()
      .email(t('error.email-invalid'))
      .required(t('error.email-required')),
  });

  const BuyFormSchema = Yup.object({
    name: Yup.string()
      .min(2, t('error.name-invalid'))
      .required(t('error.name-required')),

    email: Yup.string()
      .email(t('error.email-invalid'))
      .required(t('error.email-required')),

    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], t('error.email-match'))
      .required(t('error.email-confirm')),

    ticketNumber: Yup.number()
      .typeError(t('error.number-valid'))
      .min(1, t('error.number-value'))
      .max(userCanBuy, t('error.number-max', {userCanBuy}))
      .required(t('error.number-required')),

    phone: Yup.string()
      .min(7, t('error.phone-valid'))
      .required(t('error.phone-required')),
  });

  const handleEmailValidation = async (email) => {
    setErrorMessage('');
    setVerified('');

    try {
      const res = await fetch(`/api/v1/competitions/${id}?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (data.user_can_buy > 0) {
        setVerified(true);
        setErrorMessage('');
        setUserMaxTickets(data?.user_max);
        setUserTickets(data?.user_tickets);
        setUserCanBuy(data?.user_can_buy);
        setValidationEmail();


      } else if (data.user_can_buy <= 0) {
        setErrorMessage('api_response.errors.ticket_limit');
        setUserMaxTickets(data?.user_max);
        setUserTickets(data?.user_tickets);
        setUserCanBuy(data?.user_can_buy);
      } else {
        setErrorMessage('api_response.errors.availability');
      }
    } catch (err) {
      setErrorMessage('api_response.errors.failed');
      throw new Error(err);
    }
  }

  const handleBuy = async (email, phone, clientName, quantity) => {
    try {
      const res = await fetch(`/api/v1/competitions/${id}/reserve`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, phone, clientName, quantity}),
      });

      const data = await res.json();

      if (res.ok && data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }

      const messages = {
        competition_not_found: 'error.competition_not_found',
        competition_ended: 'error.competition_ended',
        competition_sold_out: 'error.competition_not_found',
        user_limit_reached: 'error.competition_not_found',
      };

      const errorMsg = messages[data.error] || 'error.something-went-wrong';

      setBuyError(t(errorMsg, {remaining: data.remaining}));
    } catch (err) {
      setBuyError(t('error.network-problem'));
      throw new Error(err);
    }
  }


  return (<>
      <div>
        {verified && <p className={styles.verified}>{t('api_response.success', {
          tickets: userTickets,
          maxTickets: userMaxTickets,
          userCanBuy
        })}</p>}
        {!verified &&<>
          <Formik
            initialValues={{email: ""}}
            validationSchema={EmailSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {

              handleEmailValidation(values.email);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({isSubmitting, isValid}) => (
              <Form className={styles.formik}>
                <div className={styles['input-container']}>
                  <Field
                    className="formik-input"
                    type="email"
                    name="email"
                    placeholder={t('email-placeholder')}
                  />
                  <ErrorMessage name="email" component="div"/>
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting || !isValid}>
                  {t('submit')}
                </button>
              </Form>
            )}
          </Formik>
          {errorMessage &&
            <p className={styles.errorMessage}>{t(errorMessage, {tickets: userTickets, maxTickets: userMaxTickets})}</p>}
        </>}
      </div>
      {verified &&     <>
        {buyError && <p className={styles.errorMessage}>{buyError}</p>}
        <Formik
        initialValues={{
          name: "",
          email: "",
          confirmEmail: "",
          ticketNumber: 0,
          phone: "",
        }}
        validationSchema={BuyFormSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          try {
            handleBuy(values.email, values.phone, values.name, values.ticketNumber);

            resetForm();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({isSubmitting, isValid}) => (
          <Form className={styles.formik}>

            <div className={styles['input-container']}>
              <Field className="formik-input" name="name" placeholder={t('name-placeholder')}/>
              <ErrorMessage name="name" component="div"/>
            </div>

            <div className={styles['input-container']}>
              <Field className="formik-input" name="email" type="email" placeholder={t('email-placeholder')}/>
              <ErrorMessage name="email" component="div" />
            </div>

            <div className={styles['input-container']}>
              <Field className="formik-input" name="confirmEmail" type="email" placeholder={t('confirm-email-placeholder')}/>
              <ErrorMessage name="confirmEmail" component="div" />
            </div>

            <div className={styles['input-number-container']}>
              <div className={styles['input-container']}>
                <Field className="formik-input" name="ticketNumber" type="number"/>
                <ErrorMessage name="ticketNumber" component="div" />
              </div>

              <div className={styles['input-container']}>
                <Field className="formik-input" name="phone" placeholder="Telephone Number"/>
                <ErrorMessage name="phone" component="div" />
              </div>

            </div>


            <button className="submit-button" type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? t('validating_buy') : t('submit_buy')}
            </button>

          </Form>
        )}
      </Formik> </>}
    </>
  );
};

export default EmailForm;
