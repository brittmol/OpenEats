import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_RESERVATIONS = "reservations/LOAD_RESERVATIONS";
export const loadRes = (reservations) => {
  return {
    type: LOAD_RESERVATIONS,
    reservations,
  };
};

const ADD_RES = "reservations/ADD_RES";
export const addRes = (res) => {
  return {
    type: ADD_RES,
    res,
  };
};

const DELETE_RES = "reservations/DELETE_RES";
export const deleteRes = (res) => {
  return {
    type: DELETE_RES,
    res,
  };
};

/* ----- THUNK ------ (communicates to backend api and retrieves it) */
export const getReservations = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/reservations`);
  if (response.ok) {
    const reservations = await response.json();
    dispatch(loadRes(reservations));
    return reservations;
  }
};

export const createRes = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRes(data));
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

export const updateRes = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRes(data));
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

export const removeRes = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations/${payload.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteRes(data));
  }
};

/* ------ REDUCER ------ */
export default function reservationReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_RESERVATIONS: {
      action.reservations.forEach((res) => {
        newState[res.id] = res;
      });
      return newState;
    }
    case ADD_RES: {
      return (newState = {
        ...state,
        [action.res.id]: action.res,
      });
    }
    case DELETE_RES: {
      newState = { ...state };
      delete newState[action.res.id];
      return newState;
    }
    default:
      return state;
  }
}
