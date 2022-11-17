import React from 'react';
import { useField } from 'formik';

import EmbedMap from '../inputs/EmbedMap';

const FormEmbedMap = ({
  name,
  ...props
}) => {
  const [{ value }] = useField(name);

  const q = Array.isArray(value)
    ? value[0] && value[1] && [...value].reverse().join(',')
    : value;

  return (
    <EmbedMap
      {...props}
      q={q}
    />
  );
};

export default FormEmbedMap;
