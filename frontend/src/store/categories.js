import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_CATEGORIES = "categories/LOAD_CATEGORIES";
export const loadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories,
  };
};

/* ----- THUNK ------ (communicates to backend api and retrieves it) */
export const getCategories = () => async (dispatch) => {
  const response = await csrfFetch(`/api/categories`);
  if (response.ok) {
    const categories = await response.json();
    dispatch(loadCategories(categories));
  }
};

/* ------ REDUCER ------ */
export default function categoryReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_CATEGORIES: {
      action.categories.forEach((category) => {
        newState[category.id] = category;
      });
      return newState;
    }
    default:
      return state;
  }
}
