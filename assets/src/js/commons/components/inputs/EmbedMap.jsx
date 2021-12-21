import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useTranslation } from 'react-i18next';

import env from '../../config/env';
import useDebounce from '../../hooks/useDebounce';

const root = 'https://www.google.com/maps/embed/v1/place';

const EmbedMap = ({
  className = 'rounded ratio ratio-21x9 max-vh-50 overflow-hidden',
  debounce: [wait = 1000, opts] = [],
  query,
  ...props
}) => {
  const { i18n } = useTranslation();
  const [q, setQ] = useState('');

  const update = useDebounce(setQ, wait, opts);

  useEffect(() => {
    update(query);
  }, [query]);

  if (!q) return '';

  const src = `${root}?${qs.stringify({
    key: env.googleApiKey,
    language: i18n.language,
    ...props,
    q,
  })}`;

  return (
    <div className={className}>
      <iframe
        title="map"
        src={src}
      />
    </div>
  );
};

export default EmbedMap;
