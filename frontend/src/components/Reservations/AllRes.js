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

  return (
    <>
      <h1>Welcome to OpenEats! Here are Restaurants:</h1>
      {resArray?.map((res) => (
        <div key={res?.id}>
          <ul>
            {console.log("res", res?.Restaurant)}
            <li>{res?.User?.username}</li>
            <li>{res?.Restaurant?.title}</li>
            <li>{res?.time}</li>
            <li>{res?.numPpl}</li>
            <li>{res?.specialReq}</li>
          </ul>
        </div>
      ))}
    </>
  );
}
