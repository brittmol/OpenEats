import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurants } from "../../store/restaurants";
import CreateResForm from "../Reservations/CreateRes";

export default function SingleRestaurant() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { restId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const restaurants = useSelector((store) => store.restaurantReducer);
  const rest = restaurants[restId];

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getRestaurants()).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (loaded && !rest) history.push("/pagenotfound");
  }, [loaded, rest]);

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
