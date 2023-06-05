import React from 'react';
import { useTranslation } from 'react-i18next';

const Error = ({
  res: { code = 404, payload: { message } = {} } = {},
}) => {
  const { t } = useTranslation();
  const m = message ?? t('res.notFound');

  return (
    <div
      className={`
        text-center
        position-absolute top-50 start-50 translate-middle
      `}
    >
      <h1
        className="text-primary"
        style={{
          fontSize: '6rem',
        }}
      >
        {code}
      </h1>
      <p>{m}</p>
      <a href="/" className="mt-4 btn btn-outline-primary">
        {t('res.goBack')}
      </a>
    </div>
  );
};

export default Error;
