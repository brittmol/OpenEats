import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getOneRes, getReservations } from "../../store/reservations";
import { date, time } from "./functions";

export default function ConfirmRes() {
  const dispatch = useDispatch();
  const { resId } = useParams();

  // useEffect(() => {
  //   dispatch(getOneRes(resId));
  // }, [dispatch, resId]);

  useEffect(() => {
    dispatch(getReservations(sessionUser?.id))
  }, [dispatch, sessionUser])

  const sessionUser = useSelector((store) => store.session.user);
  const res = useSelector((store) => store.reservationReducer[resId]);

  return (
    <>
      {res && res?.userId !== sessionUser?.id ? (
        <Redirect to={`/users/${sessionUser?.id}/reservations`} />
      ) : null}
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
