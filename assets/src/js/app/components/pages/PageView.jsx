import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Navigate } from 'react-router-dom';

import Fetchable from '~/commons/components/util/Fetchable';
import Html from '~/commons/components/util/Html';
import Centered from '../../../commons/components/layout/Centered';

const PageView = () => {
  const { i18n } = useTranslation();
  const { '*': url } = useParams();

  return (
    <Fetchable req={{ url: `/api/views/u?url=/${url}` }}>
      {(view) => {
        if (view.redirect) {
          if (view.redirect.match(/^http/i)) {
            window.location.href = view.redirect;

            return '';
          }

          return <Navigate to={view.redirect} replace />;
        }

        return (
          <Centered>
            <div className="col-8 py-4">
              <h1>{i18n.pickLng(view.title)}</h1>
              <div>
                <Html>{i18n.pickLng(view.body)}</Html>
              </div>
            </div>
          </Centered>
        );
      }}
    </Fetchable>
  );
};

export default PageView;
