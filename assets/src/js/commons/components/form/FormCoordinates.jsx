import React, { useRef } from 'react';
import { useField } from 'formik';
import {
  LoadScript, Autocomplete, GoogleMap, Marker, Circle,
} from '@react-google-maps/api';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

import env from '../../config/env';
import FormField from './FormField';

// TODO:
// 1. search bar and geocode
// 2. handle geocode errors
// 3. current location (gps)
// 4. draggable marker
// 5. radius

const primaryColor = getComputedStyle(document.body)
  .getPropertyValue('--bs-primary');

const FormCoordinates = ({
  radius: radiusField,
  mapClassName = 'rounded ratio ratio-21x9 max-vh-50 overflow-hidden mb-3',
  zoom = 19,
  ...props
}) => {
  const { name } = props;
  const ac = useRef();
  const map = useRef();
  const cir = useRef();
  const [{ value },, { setValue, setTouched }] = useField(name);
  const [{ value: radius = 0 }] = useField(radiusField);
  const pos = value?.[0] && value?.[1] && { lat: +value[1], lng: +value[0] };
  const initCenter = useRef(pos);

  const change = (v) => {
    setTouched(true, false);
    setValue(v);
  };

  return (
    <LoadScript
      googleMapsApiKey={env.googleApiKey}
      libraries={['places']}
    >
      <FormField {...props}>
        {({ className }) => (
          <Autocomplete
            onLoad={(autocomplete) => { ac.current = autocomplete; }}
            onPlaceChanged={() => {
              if (ac.current) {
                const p = ac.current.getPlace();
                const { location: l, viewport } = p.geometry;

                change([l.lng(), l.lat()]);
                if (map.current) {
                  map.current.fitBounds(viewport);
                } else {
                  initCenter.current = l;
                }
              }
            }}
          >
            <div className="input-group input-group-input mb-3">
              <span className="input-group-text">
                <FA icon={faSearch} />
              </span>
              <input type="text" className={className} />
            </div>
          </Autocomplete>
        )}
      </FormField>
      {pos && (
        <div className={mapClassName}>
          <GoogleMap
            onLoad={(m) => { map.current = m; }}
            zoom={zoom}
            center={initCenter.current}
          >
            {radius && !Number.isNaN(+radius) && (
              <Circle
                onLoad={(c) => { cir.current = c; }}
                center={pos}
                radius={+radius}
                options={{
                  strokeColor: primaryColor,
                  fillColor: primaryColor,
                  fillOpacity: 0.16,
                  strokeWeight: 2,
                }}
              />
            )}
            <Marker
              position={pos}
              draggable
              onDragStart={() => {
                if (cir.current) cir.current.setVisible(false);
              }}
              onDragEnd={({ latLng: l }) => {
                change([l.lng(), l.lat()]);
                if (cir.current) cir.current.setVisible(true);
              }}
            />
          </GoogleMap>
        </div>
      )}
    </LoadScript>
  );
};

export default FormCoordinates;
