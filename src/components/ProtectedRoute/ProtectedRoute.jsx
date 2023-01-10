//  Защищенный роут для доступа только после логина  //
//  Проверяем статус логина и грузим компонент или редиректим на логин  //

import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {props.loggedIn ? <Component {...props} /> : <Redirect to='/signin' />}
    </Route>
  );
}

export default ProtectedRoute;