import React from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { useNavigate, Link } from 'react-router-dom';
import Centered from '~/commons/components/layout/Centered';
import Form from '~/commons/components/form';
import { email } from '~/commons/validators';
import { resolvePath } from '~/commons/helpers';

const PagePwdResetMail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Centered>
      <div className="col-4 py-3">
        <Form
          alert={{ className: 'w-auto my-3' }}
          schema={object({
            email: email().required(),
          })}
          defaults={{
            email: '',
          }}
          api={{ url: '/api/otps/pwdreset-email' }}
          onSubmitted={() => {
            navigate('sent');
          }}
        >
          <h1>{t('pg.pwdResetMailTitle')}</h1>
          <p className="text-muted">
            {t('pg.pwdResetMailSubTitle')}
          </p>

          <Form.Input
            name="email"
            label={null}
            placeholder={t('pg.pwdResetMailEmail')}
          />

          <Form.BtnSubmit
            icon={faPaperPlane}
          >
            {t('pg.pwdResetMailSubmit')}
          </Form.BtnSubmit>
        </Form>

        <div className="mt-3">
          <Link to={resolvePath('..')}>
            {t('pg.pwdResetMailBack')}
          </Link>
        </div>
      </div>
    </Centered>
  );
};

export default PagePwdResetMail;
