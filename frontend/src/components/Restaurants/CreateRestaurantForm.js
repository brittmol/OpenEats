import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRestaurant } from "../../store/restaurants";
import { getCategories } from "../../store/categories";
import "./Restaurants.css";

export default function CreateRestaurantForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((store) => store.session.user);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((store) => store.categoryReducer);
  const categoriesArr = Object.values(categories);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ownerId: sessionUser.id,
      categoryId: category,
      title,
      image,
      description,
      address,
      city,
      state,
      zipCode,
    };

    setErrors([]);
    const restaurant = await dispatch(createRestaurant(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      }
    );
    if (restaurant) return history.push(`/restaurants/${restaurant.id}`);
  };

  return (
    <>
      <h1>Create Restaurant</h1>
      <form onSubmit={handleSubmit} className="rest-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="errors">
              {error}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          Cuisine:&emsp;
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
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
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
        <button type="submit" className="red-btn">
          Create Restaurant
        </button>
      </form>
    </>
  );
}
