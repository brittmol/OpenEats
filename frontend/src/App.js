import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Modal } from "./context/Modal";
import AllRestaurants from "./components/Restaurants/AllRestaurants";
import SingleRestaurant from "./components/Restaurants/SingleRestaurant";
import CreateRestaurantForm from "./components/Restaurants/CreateRestaurantForm";
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
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/restaurants">
            <AllRestaurants />
          </Route>
          <Route exact path="/restaurants/new">
            {/* <h1>Component: CreateRestaurant</h1> */}
            <CreateRestaurantForm />
          </Route>
          {/* <Route exact path='/restaurants/:search'>
            <h1>Component: Searched List </h1>
          </Route> */}
          <Route exact path="/restaurants/:restId">
            <SingleRestaurant />
          </Route>
          <Route exact path="/restaurants/:restId/edit">
            <h1>Component: EditRestaurant</h1>
          </Route>
          <Route exact path="/reservations/new">
            <h1>Component: CreateReservation</h1>
          </Route>
          <Route exact path="/reservations/:resId/confirmation">
            <h1>Component: Confirmation</h1>
          </Route>
          <Route exact path="/users/:userId/profile">
            <h1>Component: UserProfile</h1>
          </Route>
          <Route exact path="/users/:userId/reservations">
            <h1>Component: UserReservations </h1>
          </Route>
          <Route exact path="/users/:userId/reservations/:resId/edit">
            <h1>Component: EditReservation </h1>
          </Route>
          {/* <Route exact path='/users/:userId/favorites'>
            <h1>Component: UserFavorites</h1>
          </Route> */}
          <Route exact path="/users/:userId/reviews">
            <h1>Component: UserReviews</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
