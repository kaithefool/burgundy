import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Fetchable from '~/commons/components/util/Fetchable';
import Html from '~/commons/components/util/Html';

const PageView = () => {
  const { i18n } = useTranslation();
  const { '*': url } = useParams();

  return (
    <Fetchable req={{ url: `/api/views/u?url=/${url}` }}>
      {(view) => (
        <div>
          <h1>{i18n.pickLng(view.title)}</h1>
          <div>
            <Html>{i18n.pickLng(view.body)}</Html>
          </div>
        </div>
      )}
    </Fetchable>
  );
};

export default PageView;
