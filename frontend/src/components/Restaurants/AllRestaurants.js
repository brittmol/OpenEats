import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import "./Restaurants.css";
import StarRating from "../Reviews/StarRating";

export default function AllRestaurants() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const restaurants = useSelector((store) => store.restaurantReducer);
  const restArray = Object.values(restaurants);

  return (
    <>
      <div className="home-search-res">
        <h1>Find your table for any occasion</h1>
        <div className="search-bar">
          <p>
            Reserve a table at one of our restaurants or add a restaurant on our
            site!
          </p>
          <button className="red-btn">
            <Link to="/create-restaurant">
              Want to put your restaurant on OpenEats?
            </Link>
          </button>
          {/* <input placeholder="*** This will be where you can search for reservation ***" />
          <input placeholder="Location, Restaurant, or Cuisine" />
          <button className="red">Let's go</button> */}
        </div>
      </div>
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
                  <StarRating rating={rest?.ratingOverall} />
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
    </>
  );
}
