import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import { getCategories } from "../../store/categories";
import Search from ".";
import StarRating from "../Reviews/StarRating/StarRating";

export default function SearchResult() {
  const dispatch = useDispatch();
  const location = useLocation();

  const restaurants = useSelector((store) => store.restaurantReducer);
  const restArray = Object.values(restaurants);

  const categories = useSelector((store) => store.categoryReducer);
  const categoriesArr = Object.values(categories);

  useEffect(() => {
    dispatch(getRestaurants());
    dispatch(getCategories());
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

  let val = location.search.split("?query=")[1]; // || url string ;
  const searchValue = location.state?.detail || val;

  // console.log("searchValue", location.state);
  let searchArr = restArray?.filter((rest) => {
    return (
      rest?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
      rest?.Category?.type?.toLowerCase().includes(searchValue.toLowerCase()) ||
      rest?.city?.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const [searchCategory, setSearchCategory] = useState([]);

  // TODO: useEffect for filter searchArr
  useEffect(() => {
    console.log('b4 search arr', searchArr, searchCategory)
    searchArr = searchArr?.filter((rest) => {
      return (
        rest?.Category?.type?.includes(searchCategory)
      )
    });
    console.log("set search cat", searchCategory);
    console.log("search arr", searchArr)
  }, [searchCategory, searchArr]);

  // console.log("searchArr", searchValue, searchArr);

  return (
    <>
      <div className="home-search-res">
        <div className="search-bar">
          <Search />
          <p>{searchArr.length} Restaurants Found</p>
        </div>
      </div>
      <div className="search-page">
        <div className="filter-bar">
          <p>Cuisine</p>
          {categoriesArr?.map((category) => (
            <div>
              <input
                type="checkbox"
                key={category?.id}
                id={category?.id}
                value={category?.type}
                onChange={(e) => setSearchCategory(e.target.value)}
              />
              <label htmlFor={category?.id}>{category?.type}</label>
            </div>
          ))}
        </div>
        <div className="rest-list">
          <div>Featured: Highest Rating, Name</div>
          {!searchArr.length && <h1>No Restaurants Found for {searchValue}</h1>}
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
      </div>
    </>
  );
}
