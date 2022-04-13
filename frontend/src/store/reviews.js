import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const loadRev = (reviews) => {
  return {
    type: LOAD_REVIEWS,
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
export const getReviews = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadRev(reviews));
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
    case LOAD_REVIEWS: {
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
