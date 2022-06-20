import React from 'react';
import { object } from 'yup';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import Centered from '~/commons/components/layout/Centered';
import Form from '~/commons/components/form';
import { email, password, passwordConfirm } from '~/commons/validators';

const PageRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Centered>
      <Form
        alert={{ className: 'w-auto my-3' }}
        schema={object({
          email: email()
            .required(),
          password: password()
            .required(),
          passwordConfirm: passwordConfirm()
            .required(),
        })}
        defaults={{
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        api={{ url: '/api/otps/register-email' }}
        onSubmitted={() => navigate('sent')}
      >
        <h3>{t('pg.register.title')}</h3>

        <Form.Input name="email" affirm />
        <Form.Password name="password" affirm />
        <Form.Password name="passwordConfirm" affirm />

        <div className="mb-3">
          <Link to="/auth">
            {t('pg.register.login')}
          </Link>
        </div>

        <Form.BtnSubmit
          icon={null}
          className="btn-primary btn-block"
        >
          {t('pg.register.submit')}
        </Form.BtnSubmit>
      </Form>
    </Centered>
  );
};

export default PageRegister;
