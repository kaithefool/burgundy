import React from 'react';
import { useField } from 'formik';

import EmbedMap from '../inputs/EmbedMap';

const FormMap = ({
  name,
  ...props
}) => {
  const [{ value }] = useField(name);

  const q = Array.isArray(value)
    ? value?.length && value.join(',')
    : value;

  return (
    <EmbedMap
      {...props}
      q={q}
    />
  );
};

export default FormMap;
