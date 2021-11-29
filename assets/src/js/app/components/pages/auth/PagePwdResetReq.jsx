import React from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import Centered from '~/commons/components/layout/Centered';
import Form from '~/commons/components/form';
import { email } from '~/commons/validators';

const PagePwdResetReq = () => {
  const { t } = useTranslation();

  return (
    <Centered>
      <div className="col-4 py-3">
        <Form
          alert={{ className: 'w-auto my-3' }}
          schema={object({
            email: email().required(),
          })}
          defaults={{
            email: '',
          }}
          api={{ url: '/api/pwd-resets' }}
          onSubmit={() => {}}
        >
          <h1>{t('pg.pwdResetReqTitle')}</h1>
          <p className="text-muted">
            {t('pg.pwdResetReqSubTitle')}
          </p>

          <Form.Input
            name="email"
            label={null}
            placeholder={t('pg.pwdResetReqEmail')}
          />

          <Form.BtnSubmit
            icon={faPaperPlane}
          >
            {t('pg.pwdResetReqSubmit')}
          </Form.BtnSubmit>
        </Form>
      </div>
    </Centered>
  );
};

export default PagePwdResetReq;
