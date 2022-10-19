import React from 'react';
import { object } from 'yup';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';

import Centered from '~/commons/components/layout/Centered';
import Form from '~/commons/components/form';
import { email, password, passwordConfirm } from '~/commons/validators';

const PageRegister = () => {
  const { t } = useTranslation();

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
      >
        {({ http }) => (http.fetched ? (
          <>
            <h2>
              <FA icon={faEnvelope} className="me-3" />
              {t('pg.register.mailSuccessTitle')}
            </h2>
            <p>
              {t('pg.register.mailSuccessSubTitle')}
            </p>
            <p>
              <strong>{t('pg.register.noEmail')}</strong>
              <br />
              <Form.BtnSubmit
                icon={null}
                className="btn-link p-0"
                onlyDirty={false}
                retry={{
                  wait: { seconds: 120 },
                  waitAfter: 0,
                  max: 2,
                }}
              >
                {t('pg.register.noEmailLink')}
              </Form.BtnSubmit>
            </p>
            <p>
              <Link to="/auth">
                {t('res.goBack')}
              </Link>
            </p>
          </>
        ) : (
          <>
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
          </>
        ))}
      </Form>
    </Centered>
  );
};

export default PageRegister;
