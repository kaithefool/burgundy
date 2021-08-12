import React from 'react';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import Form from '~/commons/components/form';

const FormLogin = () => {
  const { t } = useTranslation();

  return (
    <Form
      alert={{ fullWidth: true }}
      schema={object({
        email: string()
          .trim()
          .lowercase()
          .email()
          .required(),
        password: string()
          .required(),
      })}
      defaults={{
        email: '',
        password: '',
        presist: false,
      }}
      api={{ url: '/api/auth' }}
      onSubmitted={() => window.location.reload()}
    >
      <div className="row align-items-end">
        <div className="col">
          <h3>{t('auth.login')}</h3>
        </div>
        <div className="col-auto">
          <h6>
            <Link to="/auth/register">
              {t('auth.register')}
            </Link>
          </h6>
        </div>
      </div>

      <Form.Field name="email" />
      <Form.Field name="password" type="password" />

      <div className="row">
        <div className="col">
          <Form.Field name="presist" type="switch" />
        </div>
        <div className="col-auto">
          <Link to="/auth/pwd-recovery">
            {t('auth.pwdRecovery')}
          </Link>
        </div>
      </div>

      <Form.BtnSubmit
        icon={faUnlock}
        type="submit"
        className="btn-primary btn-block"
      >
        {t('auth.login')}
      </Form.BtnSubmit>
    </Form>
  );
};

export default FormLogin;
