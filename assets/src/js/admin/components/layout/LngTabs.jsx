import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import env from '~/lib/config/env';
import { mapLng } from '~/lib/helpers';

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
