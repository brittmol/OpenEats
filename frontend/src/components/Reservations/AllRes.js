import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getReservations } from "../../store/reservations";

export default function AllReservations() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const reservations = useSelector((store) => store.reservationReducer);
  const resArray = Object.values(reservations);

  const date = (resTime) => new Date(resTime).toLocaleDateString("en-US");
  const time = (resTime) =>
    new Date(resTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

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
