import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getReservations } from "../../store/reservations";

export default function UserReservations() {
  const dispatch = useDispatch();
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
      {sessionUser?.id && userId == sessionUser?.id ? (
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
            </div>
          ))}
        </>
      ) : sessionUser ? (
        <Redirect to={`/users/${sessionUser?.id}/profile`} />
      ) : (
        <Redirect to="/signup" />
      )}
    </>
  );
}
