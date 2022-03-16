import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import {
  updateRestaurant,
  removeRestaurant,
  getRestaurants,
} from "../../store/restaurants";
import { getCategories } from "../../store/categories";

export default function EditRestaurantForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { restId } = useParams();

  const sessionUser = useSelector((store) => store.session.user);
  const restaurants = useSelector((store) => store.restaurantReducer);
  const rest = restaurants[restId];

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((store) => store.categoryReducer);
  const categoriesArr = Object.values(categories);

  const [category, setCategory] = useState(rest?.categoryId || "");
  const [title, setTitle] = useState(rest?.title || "");
  const [description, setDescription] = useState(rest?.description || "");
  const [address, setAddress] = useState(rest?.address || "");
  const [city, setCity] = useState(rest?.city || "");
  const [state, setState] = useState(rest?.state || "");
  const [zipCode, setZipCode] = useState(rest?.zipCode || "");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: rest?.id,
      ownerId: sessionUser.id,
      categoryId: category,
      title,
      description,
      address,
      city,
      state,
      zipCode,
    };

    setErrors([]);
    const updatedRest = await dispatch(updateRestaurant(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      }
    );
    if (updatedRest) return history.push(`/restaurants/${updatedRest.id}`);
  };

  return (
    <>
      {sessionUser?.id && rest?.ownerId === sessionUser?.id ? (
        <form onSubmit={handleSubmit}>
          <h1>Update Restaurant</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>
            Cuisine:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a Cuisine</option>
              {categoriesArr?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.type}
                </option>
              ))}
            </select>
          </label>
          <textarea
            placeholder="Write a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <button type="submit">Update Restaurant</button>
        </form>
      ) : (
        <Redirect to={`/restaurants/${restId}`} />
      )}
    </>
  );
}
