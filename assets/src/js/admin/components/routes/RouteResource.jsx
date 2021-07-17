import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

const RouteResource = ({
  path,
  List,
  Doc,
  children,
  ...props
}) => (
  <Route path={path} {...props}>
    <Switch>
      {List && (
        <Route
          exact
          path={path}
          component={List}
        />
      )}
      {Doc && (
        <Route
          path={`${path}/:id`}
          component={Doc}
        />
      )}
      {children}
    </Switch>
  </Route>
);

export default RouteResource;
