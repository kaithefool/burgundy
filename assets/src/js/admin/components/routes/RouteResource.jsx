import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

const RouteResource = ({
  path,
  List,
  Doc,
  singleton = false,
  children,
  ...props
}) => {
  let routes;

  if (singleton) {
    routes = Doc && (
      <Route path={path} component={Doc} />
    );
  } else {
    routes = (
      <>
        {List && (
          <Route exact path={path} component={List} />
        )}
        {Doc && (
          <Route
            path={`${path}/:_id(new|[0-9a-f]{24})`}
            component={Doc}
          />
        )}
      </>
    );
  }

  return (
    <Route path={path} {...props}>
      <Switch>
        {children}
        {routes}
      </Switch>
    </Route>
  );
};

export default RouteResource;
