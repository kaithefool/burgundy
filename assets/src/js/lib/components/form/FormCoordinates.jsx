import React, { useRef } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  useJsApiLoader, Autocomplete, GoogleMap, Marker, Circle,
} from '@react-google-maps/api';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons/faCrosshairs';

import env from '../../config/env';
import FormInputGroup from './FormInputGroup';

const primaryColor = getComputedStyle(document.body)
  .getPropertyValue('--bs-primary');

const queryToLngLat = (q) => {
  let [lat, lng] = q.replaceAll(' ', '').split(',');
  lat = +lat;
  lng = +lng;

  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (lat > 90 || lat < -90) return null;
  if (lng > 180 || lng < -180) return null;

  return [lng, lat];
};

const libraries = ['places'];

const FormCoordinates = ({
  radius: radiusField,
  mapClassName = 'rounded ratio ratio-21x9 max-vh-50 overflow-hidden mb-3',
  zoom = 18,
  ...props
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.googleApiKey,
    libraries,
  });
  const { t } = useTranslation();
  const { name } = props;
  const ac = useRef();
  const map = useRef();
  const cir = useRef();
  const [{ value },, { setValue, setTouched }] = useField(name);
  const [{ value: radius = 0 }] = useField(radiusField || name);
  const pos = value?.[0] && value?.[1] && { lat: +value[1], lng: +value[0] };
  const initCenter = useRef(pos);

  const change = (v) => {
    setTouched(true, false);
    setValue(v);
  };

  if (!isLoaded) return null;

  return (
    <>
      <Autocomplete
        onLoad={(autocomplete) => { ac.current = autocomplete; }}
        onPlaceChanged={() => {
          if (ac.current) {
            const p = ac.current.getPlace();

            if (!p.geometry) {
              const l = queryToLngLat(p.name || '');

              if (l) {
                change(l);
                map.current.panTo({ lat: l[1], lng: l[0] });
              }

              return;
            }

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
        <FormInputGroup
          helpText={t('coordinatesHelptext')}
          {...props}
        >
          {({ className, placeholder = '' }) => (
            <>
              <span className="input-group-text">
                <FA icon={faSearch} />
              </span>
              <input
                type="text"
                className={className}
                placeholder={placeholder}
              />
              {navigator.geolocation && (
                <button
                  type="button"
                  className="btn btn-input"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition((p) => {
                      const { coords } = p;

                      change([coords.longitude, coords.latitude]);
                      map.current.panTo({
                        lat: coords.latitude, lng: coords.longitude,
                      });
                    });
                  }}
                >
                  <FA icon={faCrosshairs} />
                </button>
              )}
            </>
          )}
        </FormInputGroup>
      </Autocomplete>
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
    </>
  );
};

export default FormCoordinates;
