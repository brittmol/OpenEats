import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";
export const loadRestaurants = (restaurants) => {
  return {
    type: LOAD_RESTAURANTS,
    restaurants,
  };
};

const ADD_RESTAURANT = "restaurants/ADD_RESTAURANT";
export const addRestaurant = (restaurant) => {
  return {
    type: ADD_RESTAURANT,
    restaurant,
  };
};

const DELETE_RESTAURANT = "restaurants/DELETE_RESTAURANT";
export const deleteRestaurant = (restaurant) => {
  return {
    type: DELETE_RESTAURANT,
    restaurant,
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

export const createRestaurant = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRestaurant(data));
    return data; // or return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateRestaurant = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRestaurant(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const removeRestaurant = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${payload.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteRestaurant(data));
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
    case ADD_RESTAURANT: {
      return (newState = {
        ...state,
        [action.restaurant.id]: action.restaurant,
      });
    }
    case DELETE_RESTAURANT: {
      newState = { ...state };
      delete newState[action.restaurant.id];
      return newState;
    }
    default:
      return state;
  }
}
