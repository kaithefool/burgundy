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
        <h1>{t('pg.pwdReset.mailTitle')}</h1>
        <p className="text-muted">
          {t('pg.pwdReset.mailSubTitle')}
        </p>

        <Form.Input
          name="email"
          label={null}
          placeholder={t('pg.pwdReset.mailEmail')}
        />

        <Form.BtnSubmit
          icon={faPaperPlane}
        >
          {t('pg.pwdReset.mailSubmit')}
        </Form.BtnSubmit>
      </Form>

      <div className="mt-3">
        <Link to={resolvePath('..')}>
          {t('pg.pwdReset.mailBack')}
        </Link>
      </div>
    </Centered>
  );
};

export default PagePwdResetMail;
