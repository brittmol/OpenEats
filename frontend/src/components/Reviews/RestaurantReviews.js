import { useState, useEffect } from "react";
import StarRating from "./StarRating/StarRating";
import ViewStarRating from "./StarRating/ViewStarRating";
import EditReviewForm from "./EditReview";

export default function RestaurantReviews({ restId, reviews, sessionUser }) {
  const [inEditMode, setInEditMode] = useState(false);

  return (
    <>
      <h1>Reviews!</h1>
      <ViewStarRating />
      <div>
        {reviews?.map((rev) => (
          <div key={rev?.id} style={{ padding: "10px" }}>
            {sessionUser?.id === rev?.User?.id ? (
              <EditReviewForm
                restId={restId}
                rev={rev}
                sessionUser={sessionUser}
                inEditMode={inEditMode}
                setInEditMode={setInEditMode}
              />
            ) : (
              <>
                <div>User: {rev?.User?.username}</div>
                <div>Comment: {rev?.comment}</div>
                <StarRating rating={rev?.ratingOverall} />
                <div>Rating Overall: {rev?.ratingOverall}</div>
                <div>Food: {rev?.ratingFood}</div>
                <div>Service: {rev?.ratingService}</div>
                <div>Ambience: {rev?.ratingAmbience}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
