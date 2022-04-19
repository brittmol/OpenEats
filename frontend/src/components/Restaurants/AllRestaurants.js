import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import "./Restaurants.css";
import StarRating from "../Reviews/StarRating/StarRating";
import Search from "../Search";

import LoginFormModal from "../Auth/LoginFormModal";

export default function AllRestaurants() {
  const dispatch = useDispatch();

  const restaurants = useSelector((store) => store.restaurantReducer);
  const restArray = Object.values(restaurants);
  const sessionUser = useSelector((store) => store.session.user);

  const avgRating = (rest) => {
    const reviews = rest?.Reviews;
    if (reviews?.length) {
      const overallRatingsArr = reviews?.map((rev) => rev?.ratingOverall);
      const avg = (
        overallRatingsArr?.reduce((a, b) => a + b) / overallRatingsArr?.length
      ).toFixed(1);
      return avg;
    }
  };

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  return (
    <>
      <div className="home-search-res">
        <h1>Find your table for any occasion</h1>
        <div className="search-bar">
          <p>
            Reserve a table at one of our restaurants or add a restaurant on our
            site!
          </p>
          {!sessionUser ? (
            <p>
              Want to put your restaurant on OpenEats?
              <LoginFormModal btnName={"Log in here!"} />
            </p>
          ) : (
            <button className="red-btn">
              <Link to="/create-restaurant">Add a Restaurant!</Link>
            </button>
          )}
          <Search />
        </div>
      </div>
      <div className="white">
        <div className="all-rest-cards">
          {restArray?.map((rest) => (
            <div key={rest?.id}>
              <Link to={`/restaurants/${rest?.id}`}>
                <div className="rest-card">
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
                  <div className="rest-card-text">
                    <div className="title">{rest?.title}</div>
                    <StarRating rating={avgRating(rest)} />
                    <div>{rest?.Category?.type}</div>
                    <div>
                      {rest?.city}, {rest?.state}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
