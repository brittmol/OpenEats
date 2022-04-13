import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import Search from ".";
import StarRating from "../Reviews/StarRating/StarRating";

export default function SearchResult() {
  const dispatch = useDispatch();
  const location = useLocation();

  const restaurants = useSelector((store) => store.restaurantReducer);
  const restArray = Object.values(restaurants);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

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

  const searchValue = location.state?.detail // || url string ;

  console.log("searchValue", location.state);
  let searchArr = restArray?.filter((rest) => {
    return (
      rest?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
      rest?.Category?.type?.toLowerCase().includes(searchValue.toLowerCase()) ||
      rest?.city?.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  console.log("searchArr", searchValue, searchArr);

  return (
    <>
      <div className="home-search-res">
        <div className="search-bar">
          <Search />
          <p>{searchArr.length} Restaurants Found</p>
        </div>
      </div>
      <div>
        {!searchArr.length && <h1>No Restaurants Found</h1>}
        {searchArr?.map((rest) => (
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
    </>
  );
}
