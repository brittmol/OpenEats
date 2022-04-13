import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_USER_REVIEWS = "reviews/LOAD_USER_REVIEWS";
export const loadUserRev = (reviews) => {
  return {
    type: LOAD_USER_REVIEWS,
    reviews,
  };
};

const LOAD_REST_REVIEWS = "reviews/LOAD_REST_REVIEWS";
export const loadRestRev = (reviews) => {
  return {
    type: LOAD_REST_REVIEWS,
    reviews,
  };
};

const ADD_REV = "reviews/ADD_REV";
export const addRev = (rev) => {
  return {
    type: ADD_REV,
    rev,
  };
};

const DELETE_REV = "reviews/DELETE_REV";
export const deleteRev = (rev) => {
  return {
    type: DELETE_REV,
    rev,
  };
};

/* ----- THUNK ------ (communicates to backend api and retrieves it) */
export const getUserReviews = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadUserRev(reviews));
    return reviews;
  }
};

export const getRestReviews = (restId) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${restId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadRestRev(reviews));
    return reviews;
  }
};

export const createRev = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRev(data));
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

export const updateRev = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRev(data));
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

export const removeRev = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${payload.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteRev(data));
  }
};

/* ------ REDUCER ------ */
export default function reviewReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_USER_REVIEWS: {
      action.reviews.forEach((rev) => {
        newState[rev.id] = rev;
      });
      return newState;
    }
    case LOAD_REST_REVIEWS: {
      action.reviews.forEach((rev) => {
        newState[rev.id] = rev;
      });
      return newState;
    }
    case ADD_REV: {
      return (newState = {
        ...state,
        [action.rev.id]: action.rev,
      });
    }
    case DELETE_REV: {
      newState = { ...state };
      delete newState[action.rev.id];
      return newState;
    }
    default:
      return state;
  }
}
