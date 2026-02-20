import React from 'react';
import styles from "./TermsConditions.module.scss";
import {useTranslation} from "react-i18next";

const TermsConditions = () => {
  const [t] = useTranslation('global', {keyPrefix: "terms" })

  const sections = t("sections", { returnObjects: true });

  const SectionRenderer = ({ section }) => {
    return (
      <div style={{ marginBottom: "2rem" }}>
        <h3>{section.title}</h3>

        {/* Paragraph Content */}
        {section.content && <p>{section.content}</p>}

        {/* Intro Text */}
        {section.intro && <p>{section.intro}</p>}

        {/* Bullet Points */}
        {section.points && (
          <ul>
            {section.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        {/* Prohibited List */}
        {section.prohibited && (
          <ul>
            {section.prohibited.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        {/* Consequences List */}
        {section.consequences && (
          <>
            <strong>{section.consequencesTitle}</strong>
            <ul>
              {section.consequences.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Nested Subsections (Privacy Section) */}
        {section.subsections &&
          Object.entries(section.subsections).map(([subKey, sub]) => (
            <div key={subKey} style={{ marginTop: "1rem" }}>
              <h3>{sub.title}</h3>

              {sub.points && (
                <ul>
                  {sub.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    );
  };


  return (
    <section>
      <div className="container">
        <div className="section-content">
          <h2 className={styles.header}>{t('meta.title')}</h2>
        </div>
        <div className={styles['terms-content']}>
          <p>{t('introduction')}</p>
          {Object.entries(sections).map(([key, section]) => (
            <SectionRenderer key={key} section={section} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TermsConditions;
