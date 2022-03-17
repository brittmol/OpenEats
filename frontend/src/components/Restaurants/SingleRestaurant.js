import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CreateResForm from "../Reservations/CreateRes";

export default function SingleRestaurant() {
  const { restId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const restaurants = useSelector((store) => store.restaurantReducer);
  const rest = restaurants[restId];

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
      {/* <div>Reviews:</div> */}
    </>
  );
}
