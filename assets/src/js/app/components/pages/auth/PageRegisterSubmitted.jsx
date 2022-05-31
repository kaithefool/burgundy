import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { Link } from 'react-router-dom';
import Centered from '~/commons/components/layout/Centered';
import { resolvePath } from '~/commons/helpers';

const PageRegisterSubmitted = () => {
  const { t } = useTranslation();

  return (
    <Centered>
      <h2>
        <FA icon={faEnvelope} className="me-3" />
        {t('pg.register.mailSuccessTitle')}
      </h2>
      <p>
        {t('pg.register.mailSuccessSubTitle')}
      </p>
      <p>
        <strong>{t('pg.register.noEmail')}</strong>
        <br />
        <Link to={resolvePath('..')}>
          {t('pg.register.noEmailLink')}
        </Link>
      </p>
    </Centered>
  );
};

export default PageRegisterSubmitted;
