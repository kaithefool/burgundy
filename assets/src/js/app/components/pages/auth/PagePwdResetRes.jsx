import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { Link } from 'react-router-dom';
import Centered from '~/commons/components/layout/Centered';

const PagePwdResetReq = () => {
  const { t } = useTranslation();

  return (
    <Centered>
      <div className="col-4 py-3">
        <div>
          <h2>
            <FA icon={faEnvelope} className="me-3" />
            {t('pg.pwdResetResTitle')}
          </h2>
          <p>
            {t('pg.pwdResetResSubTitle')}
          </p>
          <p>
            <strong>{t('pg.pwdResetNoEmail')}</strong>
            <br />
            <Link to="/auth/pwd-recovery">
              {t('pg.pwdResetResend')}
            </Link>
          </p>
        </div>
      </div>
    </Centered>
  );
};

export default PagePwdResetReq;
