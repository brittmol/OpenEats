import StarRating from "./StarRating/StarRating";
import EditReviewForm from "./EditReview";

export default function RestaurantReviews({ restId, reviews, sessionUser }) {
  return (
    <>
      <h1>Reviews!</h1>
      <div>
        {reviews?.map((rev) => (
          <div key={rev?.id} style={{ padding: "10px" }}>
            {sessionUser?.id === rev?.User?.id ? (
              <EditReviewForm
                restId={restId}
                rev={rev}
                sessionUser={sessionUser}
              />
            ) : (
              <>
                <div>User: {rev?.User?.username}</div>
                <StarRating rating={rev?.ratingOverall} />
                <div>Rating Overall: {rev?.ratingOverall}</div>
                <div>Food: {rev?.ratingFood}</div>
                <div>Service: {rev?.ratingService}</div>
                <div>Ambience: {rev?.ratingAmbience}</div>
                <div>Comment: {rev?.comment}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
