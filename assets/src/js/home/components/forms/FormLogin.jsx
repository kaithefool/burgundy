import React from 'react';
import { object } from 'yup';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import Form from '~/commons/components/form';
import { email, password } from '~/commons/validators';

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
      <div className="row align-items-end">
        <div className="col">
          <h3>{t('pg.auth.title')}</h3>
        </div>
        <div className="col-auto">
          <h6>
            <Link to="/auth/register">
              {t('pg.auth.register')}
            </Link>
          </h6>
        </div>
      </div>

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

      <Form.BtnSubmit
        icon={faUnlock}
        className="btn-primary btn-block"
      >
        {t('pg.auth.submit')}
      </Form.BtnSubmit>
    </Form>
  );
};

export default FormLogin;
