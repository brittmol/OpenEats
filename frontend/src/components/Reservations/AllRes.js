import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getReservations } from "../../store/reservations";
import { date, time } from "./functions";

export default function AllReservations() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);

  useEffect(() => {
    dispatch(getReservations(sessionUser.id));
  }, [dispatch]);

  const reservations = useSelector((store) => store.reservationReducer);
  const resArray = Object.values(reservations);

  return (
    <>
      <h1>Welcome to OpenEats! Here are Restaurants:</h1>
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
  );
}
