import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons/faCheckCircle';

import PageCentered from '../../layout/PageCentered';
import Fetchable from '~/lib/components/util/Fetchable';
import { resolvePath } from '~/lib/helpers';

const PageRegisterVerify = () => {
  const { t } = useTranslation();
  const { key } = useParams();

  return (
    <Fetchable
      req={{
        method: 'post',
        url: '/api/otps/register-email/affirm',
        data: { verifyKey: key },
      }}
    >
      <PageCentered>
        <h2>
          <FA icon={faCheckCircle} className="me-3" />
          {t('pg.register.successTitle')}
        </h2>
        <p>
          {t('pg.register.successSubTitle')}
        </p>
        <p>
          <Link to={resolvePath('../../..')}>
            {t('pg.register.successLink')}
          </Link>
        </p>
      </PageCentered>
    </Fetchable>
  );
};

export default PageRegisterVerify;
