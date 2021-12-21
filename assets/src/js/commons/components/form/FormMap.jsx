import React from 'react';
import { useField } from 'formik';

import EmbedMap from '../inputs/EmbedMap';

const FormMap = ({
  name,
  ...props
}) => {
  const [{ value }] = useField(name);

  return <EmbedMap query={value} {...props} />;
};

export default FormMap;
