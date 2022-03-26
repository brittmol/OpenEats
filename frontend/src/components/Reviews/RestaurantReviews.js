import StarRating from "./StarRating";

export default function RestaurantReviews({ reviews }) {
  return (
    <>
      <h1>Reviews!</h1>
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
