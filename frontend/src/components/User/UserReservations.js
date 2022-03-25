import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { getReservations, removeRes } from "../../store/reservations";
import { date, time } from "../Reservations/functions";
import "./User.css";

export default function UserReservations() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const reservations = useSelector((store) => store.reservationReducer);
  const resArray = Object.values(reservations);

  useEffect(() => {
    if (sessionUser?.id !== userId) {
      history.push(`/users/${sessionUser?.id}/reservations`);
    }
  }, [sessionUser, history, userId]);

  useEffect(() => {
    dispatch(getReservations(sessionUser?.id));
  }, [dispatch, sessionUser]);

  return (
    <>
      <h1>{sessionUser?.firstName}'s Reservations:</h1>
      {resArray?.map((res) => (
        <div key={res?.id} className="rsvp">
          <div className="rest-details">
            <div>{res?.Restaurant?.title}</div>
            <div>
              {res?.Restaurant?.city}, {res?.Restaurant?.state}
            </div>
          </div>

          <div className="rsv-details">
            <div>{date(res?.time)}</div>
            <div>{time(res?.time)}</div>
            <div>{res?.numPpl} people</div>
            <div>
              {res.specialReq ? <>*Special Request: {res.specialReq}</> : null}
            </div>
          </div>

          <div className="all-btns">
            <button className="red-btn">
              <Link to={`/reservations/${res?.id}/edit`}>Modify</Link>
            </button>
            <button
              className="red-btn"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to cancel this reservation?"
                  )
                ) {
                  dispatch(removeRes(res));
                  // history.push(`/users/${sessionUser?.id}/reservations`);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
