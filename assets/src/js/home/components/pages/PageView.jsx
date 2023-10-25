import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Fetchable from '~/lib/components/util/Fetchable';
import Html from '~/lib/components/util/Html';
import PageCentered from '../layout/PageCentered';
import { meta } from '~/lib/helpers';

const PageView = () => {
  const { '*': url } = useParams();
  const { i18n } = useTranslation();

  return (
    <Fetchable req={{ url: `/api/views/u?url=/${url}` }}>
      {(view) => {
        meta({ title: i18n.pickLng(view.title) });

        return (
          <PageCentered size="lg">
            <div className="py-4">
              <h1 className="mb-4">{i18n.pickLng(view.title)}</h1>
              <div>
                <Html>{i18n.pickLng(view.body)}</Html>
              </div>
            </div>
          </PageCentered>
        );
      }}
    </Fetchable>
  );
};

export default PageView;
