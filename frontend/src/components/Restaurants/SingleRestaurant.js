import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";

export default function SingleRestaurant() {
  const { restId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const restaurants = useSelector((store) => store.restaurantReducer);
  const rest = restaurants[restId];

  return (
    <>
      <h1>{rest?.title}</h1>
      <div>{rest?.Category.type}</div>
      <div>{rest?.description}</div>
      <div>Reviews:</div>
    </>
  );
}
