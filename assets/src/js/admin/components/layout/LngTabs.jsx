import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import env from '~/commons/config/env';
import { mapLng } from '~/commons/helpers';

const LngTabs = ({
  children,
}) => (
  <Tabs
    defaultActiveKey={env.lngs[0]}
    className="mb-4"
    unmountOnExit
  >
    {mapLng((lng, lngLabel) => (
      <Tab
        key={lng}
        eventKey={lng}
        title={lngLabel}
      >
        {children(lng)}
      </Tab>
    ))}
  </Tabs>
);

export default LngTabs;
