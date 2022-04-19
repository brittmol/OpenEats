import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { getUserReservations, removeRes } from "../../store/reservations";
import { date, time } from "../Reservations/functions";
import "./User.css";

export default function UserReservations() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();

  const sessionUser = useSelector((store) => store.session.user);
  const reservations = useSelector((store) => store.reservationReducer);
  const resArray = Object.values(reservations);

  resArray.sort((a, b) => {
    const aTime = a?.time;
    const bTime = b?.time;
    if (aTime > bTime) return -1;
    if (aTime < bTime) return 1;
    return 0;
  });
  console.log("sort", resArray);

  const futureRes = resArray
    .filter((res) => new Date(res?.time) > new Date())
    .reverse();
  const pastRes = resArray.filter((res) => new Date(res?.time) < new Date());
  // console.log('ex', pastRes[0]?.time < futureRes[0]?.time)

  useEffect(() => {
    if (sessionUser?.id !== userId) {
      history.push(`/users/${sessionUser?.id}/reservations`);
    }
  }, [sessionUser, history, userId]);

  useEffect(() => {
    dispatch(getUserReservations(sessionUser?.id));
  }, [dispatch, sessionUser]);

  const resArrayFxn = (array) => {
    return array?.map((res) => (
      <div key={res?.id} className="rsvp">
        <Link to={`/restaurants/${res?.Restaurant?.id}`}>
          <div className="rest-card">
            <img
              src={res?.Restaurant?.image}
              alt="Not Found"
              onError={(e) =>
                (e.target.src =
                  "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg")
              }
              // alt="https://wallpaperaccess.com/full/1322048.jpg"
            />
          </div>
        </Link>
        <Link to={`/restaurants/${res?.Restaurant?.id}`}>
          <div className="rest-details">
            <div>{res?.Restaurant?.title}</div>
            <div>
              {res?.Restaurant?.city}, {res?.Restaurant?.state}
            </div>
          </div>
        </Link>
        <div className="rsv-details">
          <div className="text">
            <div>{date(res?.time)}</div>
            <div>{time(res?.time)}</div>
            <div>Table for {res?.numPpl} people</div>
            <div>
              {res.specialReq ? <>*Special Request: {res.specialReq}</> : null}
            </div>
          </div>
          {array === futureRes && (
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
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      <div>
        <h1>{sessionUser?.firstName}'s Reservations:</h1>
      </div>
      <div>
        <div>
          <h2>Upcoming Reservations</h2>
          {resArrayFxn(futureRes)}
        </div>

        <div>
          <h2>Past Reservations</h2>
          {resArrayFxn(pastRes)}
        </div>
      </div>
    </>
  );
}
