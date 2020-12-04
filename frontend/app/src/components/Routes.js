import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './session';

export const PrivateRoute=({ component: Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    )
  }
  export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
      />
    )
  }  