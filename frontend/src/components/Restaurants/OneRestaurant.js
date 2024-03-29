import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import { getRestReviews } from "../../store/reviews";
import CreateResForm from "../Reservations/CreateRes";
import "./Restaurants.css";
import StarRating from "../Reviews/StarRating/StarRating";
import RestaurantReviews from "../Reviews/RestaurantReviews";
import CreateReviewForm from "../Reviews/CreateReview";
// import { avgRating } from "./EditRatings";

export default function OneRestaurant() {
  const dispatch = useDispatch();
  const { restId } = useParams();

  const sessionUser = useSelector((store) => store.session.user);
  const rest = useSelector((store) => store.restaurantReducer[restId]);
  const reviews = useSelector((store) =>
    Object.values(store.reviewReducer).reverse()
  );

  const avgRating = () => {
    if (reviews?.length) {
      const overallRatingsArr = reviews?.map((rev) => rev?.ratingOverall);
      const avg = (
        overallRatingsArr?.reduce((a, b) => a + b) / overallRatingsArr?.length
      ).toFixed(1);
      return avg;
    }
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getRestaurants()).then(() => setLoaded(true));
    dispatch(getRestReviews(restId));
  }, [dispatch, restId]);

  // const [avgRating, setAvgRating] = useState(rest?.ratingOverall);
  // useEffect(() => {
  //   if (reviews?.length) {
  //     const overallRatingsArr = reviews?.map((rev) => rev?.ratingOverall);
  //     setAvgRating(
  //       Math.round(
  //         overallRatingsArr?.reduce((a, b) => a + b) / overallRatingsArr?.length
  //       )
  //     );
  //     // dispatch(updateRestaurant({ ratingOverall: avgRating }));
  //   }
  // }, [dispatch, reviews, avgRating]);

  return (
    <>
      {loaded && !rest ? (
        <Redirect to={`/restaurants/${restId}/page-not-found`} />
      ) : null}
      <div className="one-rest-page">
        <div>
          <img
            src={rest?.image}
            alt="Not Found"
            onError={(e) =>
              (e.target.src =
                "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg")
            }
            // alt="https://wallpaperaccess.com/full/1322048.jpg"
          />
        </div>
        <div className="info">
          <div className="left-panel">
            <div className="panel-header">Overview of Restaurant Details</div>
            <h1 className="title">{rest?.title}</h1>
            {sessionUser && sessionUser?.id === rest?.User?.id ? (
              <button className="red-btn" style={{ marginBottom: "20px" }}>
                <Link to={`/restaurants/${rest?.id}/edit`}>
                  Want to update?
                </Link>
              </button>
            ) : null}
            <div className="text">
              <div>{rest?.Category?.type}</div>
              <StarRating rating={avgRating(rest)} />
              {reviews.length === 1
                ? `Avg Rating: (1), 1 review`
                : reviews.length
                ? `Avg Rating: (${avgRating(rest)}), ${reviews.length} reviews`
                : "No Reviews Yet"}
              <br />
              <br />
              {/* <br /> */}
              <div>{rest?.description}</div>
              {reviews.length ? (
                <h1>Reviews!</h1>
              ) : (
                <h1>Be the first to review!</h1>
              )}
              <CreateReviewForm restId={restId} sessionUser={sessionUser} />
              <RestaurantReviews
                restId={restId}
                reviews={reviews}
                sessionUser={sessionUser}
              />
            </div>
          </div>
          <div className="right-panel">
            <CreateResForm restId={restId} sessionUser={sessionUser} />
            <div className="address">
              {rest?.address} {rest?.city}, {rest?.state} {rest?.zipCode}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
