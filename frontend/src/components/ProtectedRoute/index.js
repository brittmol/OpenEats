import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

// import PageNotFound from "../PageNotFound";
// import CheckLogin from "../Auth/CheckLogin";
// import AllRestaurants from "../Restaurants/AllRestaurants";
import "../Auth/Auth.css";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  return (
    <Route {...props}>
      {user
        ? props.children
        : history.push(
            "/"
          )
          // <>
          //   {/* <PageNotFound /> */}
          //   {/* <CheckLogin /> */}
          //   {/* <AllRestaurants /> */}
          // </>
      }
    </Route>
  );
};

export default ProtectedRoute;
