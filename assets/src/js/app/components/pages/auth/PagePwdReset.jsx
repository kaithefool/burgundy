import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import { object, string, ref } from 'yup';
import Centered from '~/commons/components/layout/Centered';
import Form from '~/commons/components/form';
import Fetchable from '~/commons/components/util/Fetchable';
import { password } from '~/commons/validators';
import { resolvePath } from '~/commons/helpers';

const PagePwdReset = () => {
  const { t } = useTranslation();
  const { key } = useParams();
  const navigate = useNavigate();

  return (
    <Fetchable
      req={{
        method: 'post',
        url: '/api/pwd-resets/verify',
        data: { verifyKey: key },
      }}
    >
      <Centered>
        <div className="col-4 py-3">
          <Form
            alert={{ className: 'w-auto my-3' }}
            schema={object({
              password: password().required(),
              passwordConfirm: string()
                .oneOf(
                  [ref('password')],
                  'Both passwords need to be the same',
                )
                .required(),
            })}
            defaults={{
              password: '',
              passwordConfirm: '',
              verifyKey: key,
            }}
            api={{ url: '/api/pwd-resets/reset' }}
            onSubmitted={() => {
              navigate(resolvePath('../../success'));
            }}
          >
            <Form.Input name="password" type="password" />
            <Form.Input name="passwordConfirm" type="password" />
            <Form.BtnSubmit>
              {t('pg.pwdResetSubmit')}
            </Form.BtnSubmit>
          </Form>
        </div>
      </Centered>
    </Fetchable>
  );
};

export default PagePwdReset;
