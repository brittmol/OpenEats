import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import {
  updateRestaurant,
  removeRestaurant,
  getRestaurants,
} from "../../store/restaurants";
import { getCategories } from "../../store/categories";
import "./Restaurants.css";

export default function EditRestaurantForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { restId } = useParams();

  const sessionUser = useSelector((store) => store.session.user);
  const rest = useSelector((store) => store.restaurantReducer[restId]);

  const categories = useSelector((store) => store.categoryReducer);
  const categoriesArr = Object.values(categories);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getRestaurants()).then(() => setLoaded(true));
    dispatch(getCategories());
  }, [dispatch]);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (rest) {
      setCategory(rest?.categoryId);
      setTitle(rest?.title);
      setImage(rest?.image);
      setDescription(rest?.description);
      setAddress(rest?.address);
      setCity(rest?.city);
      setState(rest?.state);
      setZipCode(rest?.zipCode);
    }
  }, [rest]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: rest?.id,
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
      {loaded && !rest ? (
        <Redirect to={`/restaurants/${restId}/page-not-found`} />
      ) : null}
      {rest && rest?.ownerId !== sessionUser?.id ? (
        <Redirect to={`/restaurants/${restId}`} />
      ) : null}
      <form onSubmit={handleSubmit} className="rest-form">
        <h1>Update Restaurant</h1>
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
          Update Restaurant
        </button>
        <button
          className="red-btn"
          onClick={() => {
            setCategory(rest?.categoryId);
            setTitle(rest?.title);
            setImage(rest?.image);
            setDescription(rest?.description);
            setAddress(rest?.address);
            setCity(rest?.city);
            setState(rest?.state);
            setZipCode(rest?.zipCode);
            setErrors([]);
            history.push(`/restaurants/${restId}`);
          }}
        >
          Cancel
        </button>
        <button
          className="red-btn"
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to remove ${title} restaurant?`
              )
            ) {
              dispatch(removeRestaurant(rest));
              history.push(`/restaurants`);
            }
          }}
        >
          Delete Restaurant
        </button>
      </form>
    </>
  );
}
