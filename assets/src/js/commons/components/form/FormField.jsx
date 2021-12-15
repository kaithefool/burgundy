import React from 'react';
import { useField } from 'formik';
import startCase from 'lodash/startCase';
import { useTranslation } from 'react-i18next';

import useUniqKey from '../../hooks/useUniqKey';
import env from '../../config/env';

const removeLngPath = (path) => path.replace(
  new RegExp(`\\.(${
    env.lngs.join('|')
  })$`),
  '',
);

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
  const tPath = `fields.${name}`;

  const l = label !== null
    ? (
      <label
        className={labelClassName}
        htmlFor={id}
      >
        {
          label
          || t([tPath, removeLngPath(tPath)], startCase(name))
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
      {error && touched && (
        <div className="invalid-feedback">{t(error.rule, error)}</div>
      )}
    </div>
  );
};

export default FormField;
