import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import PageNotFound from "../PageNotFound";
import CheckLogin from "../Auth/CheckLogin";
import AllRestaurants from "../Restaurants/AllRestaurants";
import "../Auth/Auth.css";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);

  return (
    <Route {...props}>
      {user ? (
        props.children
      ) : (
        <>
          <PageNotFound />
          <CheckLogin />
          {/* <AllRestaurants /> */}
        </>
      )}
    </Route>
  );
};

export default ProtectedRoute;
