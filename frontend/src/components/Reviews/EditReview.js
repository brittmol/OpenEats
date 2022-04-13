import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeRev, updateRev } from "../../store/reviews";
import CreateStarRating from "./StarRating/CreateStarRating";
import StarRating from "./StarRating/StarRating";

export default function EditReviewForm({ restId, rev, sessionUser }) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [ratingOverall, setRatingOverall] = useState(0);
  const [ratingFood, setRatingFood] = useState(0);
  const [ratingService, setRatingService] = useState(0);
  const [ratingAmbience, setRatingAmbience] = useState(0);
  const [errors, setErrors] = useState([]);
  const [inEditMode, setInEditMode] = useState(false);

  useEffect(() => {
    if (rev) {
      setComment(rev?.comment);
      setRatingOverall(rev?.ratingOverall);
      setRatingFood(rev?.ratingFood);
      setRatingService(rev?.ratingService);
      setRatingAmbience(rev?.ratingAmbience);
    }
  }, [rev]);

  const onEdit = () => setInEditMode(true);
  const onCancel = () => {
    setInEditMode(false);
    setComment(rev?.comment);
    setRatingOverall(rev?.ratingOverall);
    setRatingFood(rev?.ratingFood);
    setRatingService(rev?.ratingService);
    setRatingAmbience(rev?.ratingAmbience);
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: rev?.id,
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
      setComment(updatedRev?.comment);
      setRatingOverall(updatedRev?.ratingOverall);
      setRatingFood(updatedRev?.ratingFood);
      setRatingService(updatedRev?.ratingService);
      setRatingAmbience(updatedRev?.ratingAmbience);
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
            Edit Review!
          </button>
          <button onClick={() => onCancel()}>Cancel</button>
        </form>
      ) : (
        <>
          <div>User: {rev?.User?.username}</div>
          <StarRating rating={rev?.ratingOverall} />
          <div>Rating Overall: {rev?.ratingOverall}</div>
          <div>Food: {rev?.ratingFood}</div>
          <div>Service: {rev?.ratingService}</div>
          <div>Ambience: {rev?.ratingAmbience}</div>
          <div>Comment: {rev?.comment}</div>
          <button onClick={() => onEdit()} className="red-btn">
            Edit
          </button>
          <button
            className="red-btn"
            onClick={() => {
              if (
                window.confirm(`Are you sure you want to remove this review?`)
              ) {
                dispatch(removeRev(rev));
              }
            }}
          >
            Delete
          </button>
        </>
      )}
    </>
  );
}
