import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createRev } from "../../store/reviews";
import LoginFormModal from "../Auth/LoginFormModal";
import CreateStarRating from "./StarRating/CreateStarRating";
import "../Auth/Auth.css";

export default function CreateReviewForm({ restId, sessionUser }) {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getRestaurants());
  //   }, [dispatch]);

  const [comment, setComment] = useState("");
  const [ratingOverall, setRatingOverall] = useState(0);
  const [ratingFood, setRatingFood] = useState(0);
  const [ratingService, setRatingService] = useState(0);
  const [ratingAmbience, setRatingAmbience] = useState(0);
  const [errors, setErrors] = useState([]);

  const [inCreateMode, setInCreateMode] = useState(false);
  const onCreate = () => setInCreateMode(true);
  const onCancel = () => {
    setInCreateMode(false);
    setComment("");
    setRatingOverall(0);
    setRatingFood(0);
    setRatingService(0);
    setRatingAmbience(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: sessionUser?.id,
      restaurantId: restId,
      comment,
      ratingOverall,
      ratingFood,
      ratingService,
      ratingAmbience,
    };

    setErrors([]);
    const newRev = await dispatch(createRev(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) return setErrors(data.errors);
    });

    if (newRev) {
      setInCreateMode(false);
      setComment("");
      setRatingOverall(0);
      setRatingFood(0);
      setRatingService(0);
      setRatingAmbience(0);
    }
  };

  return (
    <>
      {!sessionUser ? (
        <LoginFormModal btnName={"Log in to create a review!"} />
      ) : inCreateMode ? (
        <form onSubmit={handleSubmit}>
          <h1>Make a Review</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className="errors">
                {error}
              </li>
            ))}
          </ul>
          <CreateStarRating
            label={"Overall"}
            rating={ratingOverall}
            setRating={setRatingOverall}
          />
          <CreateStarRating
            label={"Food"}
            rating={ratingFood}
            setRating={setRatingFood}
          />
          <CreateStarRating
            label={"Service"}
            rating={ratingService}
            setRating={setRatingService}
          />
          <CreateStarRating
            label={"Ambience"}
            rating={ratingAmbience}
            setRating={setRatingAmbience}
          />
          <div>
            <textarea
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit" className="red-btn">
            Submit Review!
          </button>
          <button onClick={() => onCancel()}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => onCreate()} className="red-btn">
          Want to share your experience?
        </button>
      )}
    </>
  );
}
