import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservations } from "../../store/reservations";

export default function ConfirmRes() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { resId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const reservations = useSelector((store) => store.reservationReducer);
  const res = reservations[resId];

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getReservations(sessionUser?.id)).then(() => setLoaded(true));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (loaded && res?.userId !== sessionUser?.id)
      history.push(`/users/${sessionUser?.id}/reservations`);
  }, [loaded, res, sessionUser, history]);

  const date = (resTime) => new Date(resTime).toLocaleDateString("en-US");
  const time = (resTime) =>
    new Date(resTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <h1>Confirmed Reservation!</h1>
      <div>
        <ul>
          <li>{res?.User?.username}</li>
          <li>{res?.Restaurant?.title}</li>
          <li>{date(res?.time)}</li>
          <li>{time(res?.time)}</li>
          <li>{res?.numPpl}</li>
          <li>{res?.specialReq}</li>
        </ul>
      </div>
    </>
  );
}
