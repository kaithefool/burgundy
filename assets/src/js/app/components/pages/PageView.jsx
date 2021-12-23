import React from 'react';
import { useParams } from 'react-router-dom';

import Fetchable from '~/commons/components/util/Fetchable';
import Html from '~/commons/components/util/Html';
import Centered from '~/commons/components/layout/Centered';
import { meta, pickLng } from '~/commons/helpers';

const PageView = () => {
  const { '*': url } = useParams();

  return (
    <Fetchable req={{ url: `/api/views/u?url=/${url}` }}>
      {(view) => {
        meta({ title: pickLng(view.title) });

        return (
          <Centered>
            <div className="col-md-8 col-sm-10 py-4">
              <h1>{pickLng(view.title)}</h1>
              <div>
                <Html>{pickLng(view.body)}</Html>
              </div>
            </div>
          </Centered>
        );
      }}
    </Fetchable>
  );
};

export default PageView;
