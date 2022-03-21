import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Modal } from "./context/Modal";
import AllRestaurants from "./components/Restaurants/AllRestaurants";
import SingleRestaurant from "./components/Restaurants/SingleRestaurant";
import CreateRestaurantForm from "./components/Restaurants/CreateRestaurantForm";
import EditRestaurantForm from "./components/Restaurants/EditRestaurant";
import ConfirmRes from "./components/Reservations/ConfirmRes";
import UserReservations from "./components/User/UserReservations";
import UserProfile from "./components/User/UserProfile";
import EditResForm from "./components/Reservations/EditRes";
import PageNotFound from "./components/PageNotFound/PageNotFound";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )}
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/restaurants">
            <AllRestaurants />
          </Route>
          <Route exact path="/restaurants/new">
            <CreateRestaurantForm />
          </Route>
          {/* <Route exact path='/restaurants/:search'>
            <h1>Component: Searched List </h1>
          </Route> */}
          <Route exact path="/restaurants/:restId">
            <SingleRestaurant />
          </Route>
          <Route exact path="/restaurants/:restId/edit">
            <EditRestaurantForm />
          </Route>
          {/* <Route exact path="/reservations/new">
            <h1>Component: CreateReservation</h1>
          </Route> */}
          <Route exact path="/reservations/:resId/confirmation">
            <ConfirmRes />
          </Route>
          <Route exact path="/reservations/:resId/edit">
            <EditResForm />
          </Route>
          <Route exact path="/users/:userId/profile">
            <UserProfile />
          </Route>
          <Route exact path="/users/:userId/reservations">
            <UserReservations />
          </Route>
          {/* <Route exact path='/users/:userId/favorites'>
            <h1>Component: UserFavorites</h1>
          </Route> */}
          {/* <Route exact path="/users/:userId/reviews">
            <h1>Component: UserReviews</h1>
          </Route> */}
          <Route exact path="/pagenotfound">
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
