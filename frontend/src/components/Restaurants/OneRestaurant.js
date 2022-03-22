import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import CreateResForm from "../Reservations/CreateRes";

export default function OneRestaurant() {
  const dispatch = useDispatch();
  const { restId } = useParams();
  console.log("restId", restId);

  const sessionUser = useSelector((store) => store.session.user);
  console.log("sessionUser", sessionUser);

  const restaurants = useSelector((store) => store.restaurantReducer);
  const rest = restaurants[restId];
  console.log("restaurants", restaurants);
  console.log("rest", rest);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  return (
    <>
      <h1>{rest?.title}</h1>
      {sessionUser && sessionUser?.id === rest?.User?.id ? (
        <button>
          <Link to={`/restaurants/${rest?.id}/edit`}>Want to update?</Link>
        </button>
      ) : null}
      <div>{rest?.Category?.type}</div>
      <div>{rest?.description}</div>
      <CreateResForm restId={restId} sessionUser={sessionUser} />
      {/* <div>Reviews:</div> */}
    </>
  );
}
