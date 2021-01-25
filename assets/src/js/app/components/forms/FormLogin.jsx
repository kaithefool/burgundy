import React from 'react';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import useHttp from '~/commons/hooks/useHttp';
import BtnHttp from '~/commons/components/btns/BtnHttp.jsx';
import { Alert } from '~/commons/components/util/Alert';
import FormField from '~/commons/components/form/FormField.jsx';

const schema = object({
  email: string()
    .trim()
    .lowercase()
    .email()
    .required(),
  password: string()
    .required(),
});
const defaults = {
  email: '',
  password: '',
  presist: false,
};

const FormLogin = () => {
  const { res, req } = useHttp();
  const { t } = useTranslation();

  return (
    <Formik
      validationSchema={schema}
      initialValues={defaults}
      onSubmit={async (values) => {
        await req({
          method: 'post',
          url: '/api/core/auth',
          data: values,
        });
        window.location.reload();
      }}
    >
      <Form>
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

        <Alert res={res} />

        <FormField name="email" />
        <FormField name="password" type="password" />

        <div className="row mb-3">
          <div className="col">
            <FormField name="presist" type="switch" />
          </div>
          <div className="col-auto">
            <Link to="/auth/pwd-recovery">
              {t('auth.pwdRecovery')}
            </Link>
          </div>
        </div>

        <BtnHttp
          res={res}
          icon={faUnlock}
          type="submit"
          className="btn-primary btn-block"
        >
          {t('auth.login')}
        </BtnHttp>
      </Form>
    </Formik>
  );
};

export default FormLogin;
