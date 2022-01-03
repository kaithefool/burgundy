import React from 'react';
import { useTranslation } from 'react-i18next';
import capitalize from 'lodash/capitalize';

import FormInput from './FormInput';

const FormSelect = ({
  children,
  ...props
}) => {
  const { t } = useTranslation();

  let cc = children;

  if (Array.isArray(cc)) {
    if (cc.every((c) => typeof c === 'string')) {
      cc = cc.map((o) => (
        <option key={o} value={o}>
          {t(o, capitalize(o))}
        </option>
      ));
    } else if (cc.every((c) => c.value !== undefined)) {
      cc = cc.map((o) => {
        const l = o.label || o.value;

        return (
          <option key={o.value} value={o.value}>
            {t(l, l)}
          </option>
        );
      });
    }
  }

  return (
    <FormInput
      as="select"
      fieldClassName="form-select"
      {...props}
    >
      {cc}
    </FormInput>
  );
};

export default FormSelect;
