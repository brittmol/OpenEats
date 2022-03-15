import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";
export const loadRestaurants = (restaurants) => {
  return {
    type: LOAD_RESTAURANTS,
    restaurants,
  };
};

/* ----- THUNK ------ (communicates to backend api and retrieves it) */
export const getRestaurants = () => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants`);
  if (response.ok) {
    const restaurants = await response.json();
    dispatch(loadRestaurants(restaurants));
  }
};

/* ------ REDUCER ------ */
export default function restaurantReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_RESTAURANTS: {
      action.restaurants.forEach((rest) => {
        newState[rest.id] = rest;
      });
      return newState;
    }
    default:
      return state;
  }
}
