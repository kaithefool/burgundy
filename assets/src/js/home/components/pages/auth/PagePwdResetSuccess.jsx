import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import { Link } from 'react-router-dom';
import PageCentered from '../../layout/PageCentered';
import { resolvePath } from '~/lib/helpers';

const PagePwdResetSuccess = () => {
  const { t } = useTranslation();

  return (
    <PageCentered>
      <h2>
        <FA icon={faCheckCircle} className="me-3" />
        {t('pg.pwdReset.successTitle')}
      </h2>
      <p>
        {t('pg.pwdReset.successSubTitle')}
      </p>
      <p>
        <Link to={resolvePath('../..')}>
          {t('pg.pwdReset.successLink')}
        </Link>
      </p>
    </PageCentered>
  );
};

export default PagePwdResetSuccess;
