import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import env from '~/commons/config/env';

const { lngs, lngLabels } = env;

const LngTabs = ({
  children,
}) => (
  <Tabs
    defaultActiveKey={lngs[0]}
    className="mb-4"
    unmountOnExit
  >
    {lngs.map((lng, i) => (
      <Tab
        key={lng}
        eventKey={lng}
        title={lngLabels[i]}
      >
        {children(lng)}
      </Tab>
    ))}
  </Tabs>
);

export default LngTabs;
