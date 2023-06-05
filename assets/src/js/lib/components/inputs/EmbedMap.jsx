import React, { useMemo } from 'react';
import qs from 'qs';
import { useTranslation } from 'react-i18next';

import env from '../../config/env';

const root = 'https://www.google.com/maps/embed/v1';

const EmbedMap = ({
  className = 'rounded ratio ratio-21x9 max-vh-50 overflow-hidden',
  type = 'place',
  q,
  ...props
}) => {
  const { i18n: { language } } = useTranslation();
  const src = useMemo(() => {
    if (!q) return null;

    return `${root}/${type}?${qs.stringify({
      key: env.googleApiKey,
      language,
      ...props,
      q,
    })}`;
  }, [q, type, language]);

  if (!src) return '';

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
