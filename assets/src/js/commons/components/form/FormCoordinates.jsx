/* global google */

import React, { useEffect } from 'react';
import { useField } from 'formik';
import useDebounce from '../../hooks/useDebounce';

const geocoder = google ? new google.maps.Geocoder() : undefined;

const FormCoordinates = ({
  address: addressField,
  name,
  debounce: [wait = 1000, opts] = [],
}) => {
  const [{ value: address }] = useField(addressField);
  const [{ value }] = useField(name);

  const update = useDebounce(async (a) => {
    geocoder.geocode({ address: a });
  }, wait, opts);

  useEffect(() => {

  }, [address]);

  return <input type="hidden" name={name} value={value} />;
};

export default FormCoordinates;
