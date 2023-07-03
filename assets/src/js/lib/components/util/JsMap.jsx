import React from 'react';
import {
  useJsApiLoader, GoogleMap, Marker,
} from '@react-google-maps/api';

import env from '~/lib/config/env';

const libraries = ['places'];

const JsMap = ({
  zoom = 18,
  position: { coordinates: coord } = {},
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.googleApiKey,
    libraries,
  });
  const pos = coord?.[0] && coord?.[1] && { lat: +coord[1], lng: +coord[0] };

  if (!isLoaded || !pos) return null;

  return (
    <GoogleMap
      zoom={zoom}
      center={pos}
    >
      <Marker position={pos} />
    </GoogleMap>
  );
};

export default JsMap;
