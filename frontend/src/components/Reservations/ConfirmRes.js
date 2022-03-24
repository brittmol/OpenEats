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
      <div className="confirm-res">
        <h1>Confirmed Reservation!</h1>
        <h3 style={{ color: "#c01823" }}>
          {res?.User?.firstName} {res?.User?.lastName}
        </h3>
        <h3 style={{ fontStyle: "italic" }}>{res?.Restaurant?.title}</h3>
        <div>{date(res?.time)}</div>
        <div>{time(res?.time)}</div>
        <div>{res?.numPpl} people</div>
        <div>*Special Request: {res?.specialReq}</div>
      </div>
    </>
  );
}
