import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { Link } from 'react-router-dom';
import PageCentered from '../../layout/PageCentered';
import { resolvePath } from '~/lib/helpers';

const PagePwdResetMailSuccess = () => {
  const { t } = useTranslation();

  return (
    <PageCentered>
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
    </PageCentered>
  );
};

export default PagePwdResetMailSuccess;
