import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import qs from 'qs';
import { useField } from 'formik';

import env from '../../config/env';
import useDebounce from '../../hooks/useDebounce';

const root = 'https://www.google.com/maps/embed/v1/place';

const FormMap = ({
  fieldClassName = 'form-control',
  children,
  wait = 1000,
  ...props
}) => {
  const [{ value }] = useField(props.name);
  const [src, setSrc] = useState('');

  const update = useDebounce((q) => {
    setSrc(`${root}?${qs.stringify({
      key: env.googleApiKey,
      q,
    })}`);
  }, wait);

  useEffect(() => {
    update(value);
  }, [value]);

  return (
    <div className={fieldClassName}>
      {/* <iframe src={src} frameBorder="0" title="map" /> */}
      {src}
    </div>
  );
};

export default FormMap;
