import React from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import useUniqKey from '../../hooks/useUniqKey';
import FormLabel from './FormLabel';

const FormField = ({
  label,
  appendLabel = false,
  labelClassName = 'form-label',
  fieldClassName = 'form-control',
  className = 'mb-3',
  helpText,
  affirm = false,
  warn = true,
  children,
  fieldOnly = false,
  showErr = true,
  noWrap = false,
  ...props
}) => {
  const { name, value } = props;
  const [, { error, touched }] = useField(name);
  const [id] = useUniqKey();
  const valid = affirm && touched && !error;
  const invalid = warn && touched && error;
  const { t } = useTranslation();
  let err = error;

  // in case of nested field
  if (err && (!err.path || !err.rule)) {
    [err] = Object.values(err);
  }

  let fC = fieldClassName;

  if (invalid) fC += ' is-invalid';
  if (valid) fC += ' is-valid';

  let c = typeof children === 'function' ? children({
    ...props,
    id,
    invalid,
    valid,
    className: fC,
  }) : children;

  if (fieldOnly) return c;

  const l = label !== null
    ? (
      <FormLabel
        htmlFor={id}
        name={value || name}
        className={labelClassName}
      >
        {label}
      </FormLabel>
    )
    : null;

  c = (
    <>
      {l && !appendLabel && l}
      {c}
      {l && appendLabel && l}
      {helpText && (
        <div className="form-text">{helpText}</div>
      )}
      {valid && typeof affirm !== 'boolean' && (
        <div className="valid-feedback">{affirm}</div>
      )}
      {showErr && err && touched && (
        <div className="invalid-feedback d-block">{t(err.rule, err)}</div>
      )}
    </>
  );

  if (noWrap) return c;

  return (
    <div className={className}>
      {c}
    </div>
  );
};

export default FormField;
