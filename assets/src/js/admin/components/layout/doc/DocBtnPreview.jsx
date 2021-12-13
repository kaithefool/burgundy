import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';

const DocBtnPreview = ({
  href,
}) => {
  const { t } = useTranslation();
  const { dirty, values } = useFormikContext();

  return (
    <a
      href={typeof href === 'function' ? href(values) : href}
      target="_blank"
      className={`
        btn btn-secondary
        ${dirty ? 'disabled' : ''}
      `}
      rel="noreferrer"
    >
      <FA icon={faEye} className="me-2" />
      {t('fields.preview')}
    </a>
  );
};

export default DocBtnPreview;
