import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import { Link } from 'react-router-dom';
import Centered from '~/commons/components/layout/Centered';
import { resolvePath } from '~/commons/helpers';

const PagePwdResetSuccess = () => {
  const { t } = useTranslation();

  return (
    <Centered>
      <div className="col-4 py-3">
        <div>
          <h2>
            <FA icon={faCheckCircle} className="me-3" />
            {t('pg.pwdResetSuccessTitle')}
          </h2>
          <p>
            {t('pg.pwdResetSuccessSubTitle')}
          </p>
          <p>
            <Link to={resolvePath('../..')}>
              {t('pg.pwdResetSuccessLink')}
            </Link>
          </p>
        </div>
      </div>
    </Centered>
  );
};

export default PagePwdResetSuccess;
