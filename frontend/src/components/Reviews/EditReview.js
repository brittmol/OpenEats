import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeRev, updateRev } from "../../store/reviews";
import CreateStarRating from "./StarRating/CreateStarRating";
import StarRating from "./StarRating/StarRating";

export default function EditReviewForm({
  restId,
  rev,
  sessionUser,
  inEditMode,
  setInEditMode,
}) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [ratingOverall, setRatingOverall] = useState(0);
  const [ratingFood, setRatingFood] = useState(0);
  const [ratingService, setRatingService] = useState(0);
  const [ratingAmbience, setRatingAmbience] = useState(0);
  const [errors, setErrors] = useState([]);

  const onEdit = () => setInEditMode(true);
  const onCancel = () => {
    setInEditMode(false);
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
    const updatedRev = await dispatch(updateRev(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) return setErrors(data.errors);
    });

    if (updatedRev) {
      setInEditMode(false);
      setComment("");
      setRatingOverall(0);
      setRatingFood(0);
      setRatingService(0);
      setRatingAmbience(0);
    }
  };

  return (
    <>
      {inEditMode ? (
        <form onSubmit={handleSubmit}>
          <h1>Update your Review</h1>
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
        <>
          <div>
              User: {rev?.User?.username}
            <button onClick={() => onEdit()} className="red-btn">
                Edit
            </button>
            <button onClick={() => onEdit()} className="red-btn">
                Delete
            </button>
          </div>
          <div>Comment: {rev?.comment}</div>
          <StarRating rating={rev?.ratingOverall} />
          <div>Rating Overall: {rev?.ratingOverall}</div>
          <div>Food: {rev?.ratingFood}</div>
          <div>Service: {rev?.ratingService}</div>
          <div>Ambience: {rev?.ratingAmbience}</div>
        </>
      )}
    </>
  );
}
