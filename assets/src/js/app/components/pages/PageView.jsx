import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Fetchable from '~/commons/components/util/Fetchable';
import Html from '~/commons/components/util/Html';
import Centered from '~/commons/components/layout/Centered';
import { meta } from '~/commons/helpers';


const PageView = () => {
  const { i18n } = useTranslation();
  const { '*': url } = useParams();

  return (
    <Fetchable req={{ url: `/api/views/u?url=/${url}` }}>
      {(view) => {
        meta({ title: i18n.pickLng(view.title) });
        
        return (
          <Centered>
            <div className="col-md-8 col-sm-10 py-4">
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
