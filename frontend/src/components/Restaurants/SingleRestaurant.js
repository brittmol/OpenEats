import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import AllReservations from "../Reservations/AllRes";
import CreateResForm from "../Reservations/CreateRes";

export default function SingleRestaurant() {
  const { restId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const restaurants = useSelector((store) => store.restaurantReducer);
  const rest = restaurants[restId];

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
      <CreateResForm restaurant={rest} sessionUser={sessionUser} />
      {/* <AllReservations /> */}
      {/* <div>Reviews:</div> */}
    </>
  );
}
