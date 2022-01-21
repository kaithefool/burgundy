/* global google */

import React, { useRef } from 'react';
import { useField } from 'formik';

import useDebounce from '../../hooks/useDebounce';
import useDidUpdate from '../../hooks/useDidUpdate';
import FormMap from './FormMap';

const geocoder = typeof google !== 'undefined'
  ? new google.maps.Geocoder() : undefined;

const FormCoordinates = ({
  address: addressField,
  name,
  debounce: [wait = 1000, opts] = [],
  map = true,
}) => {
  const [{ value: address }] = useField(addressField);
  const [,, { setValue }] = useField(name);
  const addressRef = useRef(address);

  const geocode = useDebounce(async (a) => {
    try {
      const {
        results: [{
          geometry: { location: l },
        }],
      } = await geocoder.geocode({ address: a });

      // make sure the address hasn't been changed in the meanwhile
      if (a !== addressRef.current) return;

      setValue([l.lat(), l.lng()]);
    } catch (err) {
      if (err.code === 'ZERO_RESULTS') {
        // TODO: handle invalid address error
      } else {
        throw err;
      }
    }
  }, wait, opts);

  useDidUpdate(() => {
    addressRef.current = address;
    setValue(undefined);
    if (address) {
      geocode(address);
    }
  }, [address]);

  if (!map) return '';

  return (
    <FormMap {...map} name={name} />
  );
};

export default FormCoordinates;
