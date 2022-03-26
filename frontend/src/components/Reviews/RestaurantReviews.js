import StarRating from "./StarRating/StarRating";
import ViewStarRating from "./StarRating/ViewStarRating"

export default function RestaurantReviews({ reviews }) {
  return (
    <>
      <h1>Reviews!</h1>
      <ViewStarRating />
      <div>
        {reviews?.map((rev) => (
          <div key={rev?.id} style={{ padding: "10px" }}>
            <div>User: {rev?.User?.username}</div>
            <div>Comment: {rev?.comment}</div>
            <StarRating rating={rev?.ratingOverall} />
            <div>Rating Overall: {rev?.ratingOverall}</div>
            <div>Food: {rev?.ratingFood}</div>
            <div>Service: {rev?.ratingService}</div>
            <div>Ambience: {rev?.ratingAmbience}</div>
          </div>
        ))}
      </div>
    </>
  );
}
