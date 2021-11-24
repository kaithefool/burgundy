import React from 'react';
import {
  useField,
  ErrorMessage,
} from 'formik';
import startCase from 'lodash/startCase';
import { useTranslation } from 'react-i18next';

import useUniqKey from '../../hooks/useUniqKey';

const FormField = ({
  label,
  appendLabel = false,
  labelClassName = 'form-label',
  className = 'mb-3',
  helpText,
  affirm = false,
  children,
  ...props
}) => {
  const { name } = props;
  const [, { error, touched }] = useField(name);
  const [id] = useUniqKey();
  const valid = affirm && touched && !error;
  const invalid = touched && error;
  const { t } = useTranslation();

  const l = label !== null
    ? (
      <label
        className={labelClassName}
        htmlFor={id}
      >
        {
          label
          || t(`fields.${name}`, startCase(name))
        }
      </label>
    )
    : null;

  return (
    <div className={className}>
      {l && !appendLabel && l}
      {children({
        ...props, id, invalid, valid,
      })}
      {l && appendLabel && l}
      {valid && typeof affirm !== 'boolean' && (
        <div className="valid-feedback">{affirm}</div>
      )}
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="invalid-feedback">{msg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default FormField;
