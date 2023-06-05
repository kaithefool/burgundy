import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { object } from 'yup';
import Centered from '~/lib/components/layout/Centered';
import Form from '~/lib/components/form';
import Fetchable from '~/lib/components/util/Fetchable';
import { password, passwordConfirm } from '~/lib/validators';
import { resolvePath } from '~/lib/helpers';

const PagePwdReset = () => {
  const { t } = useTranslation();
  const { key } = useParams();

  return (
    <Fetchable
      req={{
        method: 'post',
        url: '/api/otps/pwdreset-email/verify',
        data: { verifyKey: key },
      }}
    >
      <Centered>
        <Form
          alert={{ className: 'w-auto my-3' }}
          schema={object({
            password: password().required(),
            passwordConfirm: passwordConfirm()
              .required(),
          })}
          defaults={{
            password: '',
            passwordConfirm: '',
            verifyKey: key,
          }}
          api={{ url: '/api/otps/pwdreset-email/affirm' }}
          onSubmitted={() => {
          // mysterious violation of strict "same-site" cookie policy
          // when opening this page from links in emails
            window.location.href = resolvePath('../../success');
          }}
        >
          <Form.Password name="password" affirm />
          <Form.Password name="passwordConfirm" affirm />
          <Form.BtnSubmit>
            {t('pg.pwdReset.submit')}
          </Form.BtnSubmit>
        </Form>
      </Centered>
    </Fetchable>
  );
};

export default PagePwdReset;
