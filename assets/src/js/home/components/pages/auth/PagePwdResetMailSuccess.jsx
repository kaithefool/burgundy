import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { Link } from 'react-router-dom';
import Centered from '~/commons/components/layout/Centered';
import { resolvePath } from '~/commons/helpers';

const PagePwdResetMailSuccess = () => {
  const { t } = useTranslation();

  return (
    <Centered>
      <h2>
        <FA icon={faEnvelope} className="me-3" />
        {t('pg.pwdReset.mailSuccessTitle')}
      </h2>
      <p>
        {t('pg.pwdReset.mailSuccessSubTitle')}
      </p>
      <p>
        <strong>{t('pg.pwdReset.noEmail')}</strong>
        <br />
        <Link to={resolvePath('..')}>
          {t('pg.pwdReset.noEmailLink')}
        </Link>
      </p>
    </Centered>
  );
};

export default PagePwdResetMailSuccess;
