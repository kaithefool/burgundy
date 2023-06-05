import React, { useState } from 'react';
import startCase from 'lodash/startCase';
import castArray from 'lodash/castArray';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { isFragment } from 'react-is';

import BTabs from 'react-bootstrap/Tabs';
import BTab from 'react-bootstrap/Tab';

import { resolvePath } from '../../../helpers';

function flat(children, out = []) {
  castArray(children).forEach((c) => {
    if (isFragment(c)) flat(c.props.children, out);
    else if (c) out.push(c);
  });

  return out;
}

const Tabs = ({
  children,
  defaultActiveKey,
  route = false,
  ...props
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const defaultKey = defaultActiveKey
    || children[0]?.props?.eventKey;
  const [activeState, setActiveState] = useState(defaultKey);
  let { tab: activePath } = useParams();

  if (!activePath) activePath = defaultKey;

  const activeKey = route ? activePath : activeState;

  return (
    <BTabs
      className="mb-4"
      unmountOnExit
      activeKey={activeKey}
      onSelect={(k) => {
        if (k !== activeKey) {
          if (route) {
            let to = k === defaultKey ? '' : k;

            to = resolvePath(activeKey === defaultKey ? to : `../${to}`);
            navigate(to, { replace: true });
          } else {
            setActiveState(k);
          }
        }
      }}
      {...props}
    >
      {flat(children).map((child) => {
        const childProps = { ...child.props };
        const { eventKey } = childProps;

        if (!childProps.title) {
          const title = startCase(eventKey);

          childProps.title = t(`nav.${title}`, title);
        }

        return <BTab key={eventKey} {...childProps} />;
      })}
    </BTabs>
  );
};

export default Tabs;
