import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";

export default function AllRestaurants() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const restaurants = useSelector((store) => store.restaurantReducer);
  const restArray = Object.values(restaurants);

  return (
    <>
      <h1>Welcome to OpenEats! Here are Restaurants:</h1>
      {restArray?.map((rest) => (
        <div key={rest?.id}>
          <Link to={`/restaurants/${rest?.id}`}>
            {rest?.title}, {rest?.Category?.type}, {rest?.User?.username}
          </Link>
        </div>
      ))}
    </>
  );
}
