import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory, Redirect, Link } from "react-router-dom";
import { getReservations, removeRes } from "../../store/reservations";

export default function UserReservations() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const reservations = useSelector((store) => store.reservationReducer);
  const resArray = Object.values(reservations);

  useEffect(() => {
    dispatch(getReservations(userId));
  }, [dispatch]);

  const date = (resTime) => new Date(resTime).toLocaleDateString("en-US");
  const time = (resTime) =>
    new Date(resTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <h1>{sessionUser?.firstName}'s Reservations:</h1>
      {resArray?.map((res) => (
        <div key={res?.id}>
          <ul>
            <li>{res?.User?.username}</li>
            <li>{res?.Restaurant?.title}</li>
            <li>{date(res?.time)}</li>
            <li>{time(res?.time)}</li>
            <li>{res?.numPpl}</li>
            <li>{res?.specialReq}</li>
          </ul>
          <button>
            <Link to={`/reservations/${res?.id}/edit`}>Modify</Link>
          </button>
          <button
            onClick={() => {
              dispatch(removeRes(res));
              // history.push(`/users/${sessionUser?.id}/reservations`);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
