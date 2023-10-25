import React from 'react';
import { object } from 'yup';
import { useTranslation, Trans } from 'react-i18next';

import { Link } from 'react-router-dom';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import Form from '~/lib/components/form';
import { email, password } from '~/lib/validators';

const FormLogin = () => {
  const { t } = useTranslation();

  return (
    <Form
      alert={{ className: 'w-auto my-3' }}
      schema={object({
        email: email()
          .required(),
        password: password()
          .required(),
      })}
      defaults={{
        email: '',
        password: '',
        persist: true,
      }}
      api={{ url: '/api/auth' }}
      onSubmitted={() => window.location.reload()}
    >
      <Form.Input name="email" />
      <Form.Password name="password" />

      <div className="row">
        <div className="col">
          <Form.Check name="persist" type="switch" />
        </div>
        <div className="col-auto">
          <Link to="/auth/pwd-recovery">
            {t('pg.auth.pwdRecovery')}
          </Link>
        </div>
      </div>

      <div className="d-grid">
        <Form.BtnSubmit
          icon={faUnlock}
          className="btn-primary btn-block"
          retry
        >
          {t('pg.auth.submit')}
        </Form.BtnSubmit>
      </div>

      <div className="mt-4">
        <Trans i18nKey="pg.auth.register">
          Don&apos;t have an account?&nbsp;
          <Link to="/auth/register">Sign up</Link>
        </Trans>
      </div>
    </Form>
  );
};

export default FormLogin;
