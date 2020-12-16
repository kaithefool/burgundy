import React from 'react';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import useHttp from '~/commons/hooks/useHttp';
import BtnHttp from '~/commons/components/btns/BtnHttp.jsx';
import Alert from '~/commons/components/util/Alert.jsx';
import FormGroup from '~/commons/components/form/FormGroup.jsx';
import CustomControl from '~/commons/components/form/CustomControl.jsx';

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
      onSubmit={(values) => req({
        method: 'post',
        url: '/api/core/auth',
        data: values,
      })}
    >
      <Form>
        <div className="row align-items-end">
          <div className="col">
            <h3>Login</h3>
          </div>
          <div className="col-auto">
            <h6>
              <Link to="/auth/register">Sign up</Link>
            </h6>
          </div>
        </div>

        <Alert res={res} />

        <FormGroup name="email" />
        <FormGroup name="password" type="password" />

        <div className="row mb-3">
          <div className="col">
            <CustomControl
              name="presist"
              type="checkbox"
              label="Remember me"
            />
          </div>
          <div className="col-auto">
            <Link to="/auth/pwd-recovery">
              Forgot password?
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
