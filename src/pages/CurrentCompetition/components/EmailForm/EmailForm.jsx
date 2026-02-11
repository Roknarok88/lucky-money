import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./EmailForm.module.scss";
import {useTranslation} from "react-i18next";

const EmailForm = ({setValidationEmail}) => {

  const [t] = useTranslation('global', {keyPrefix: "email-form"})

  const EmailSchema = Yup.object({
    email: Yup.string()
      .email(t('error.email-invalid'))
      .required(t('error.email-required')),
  });

  const handleEmailValidation = () => {
    setValidationEmail();
  }


  return (
    <Formik

      initialValues={{ email: "" }}
      validationSchema={EmailSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        handleEmailValidation();
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form    className={styles.formik}>
          <div className={styles['input-container']}>
            <Field
              className="formik-input"
              type="email"
              name="email"
              placeholder={t('email-placeholder')}
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting || !isValid}>
            {t('submit')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
