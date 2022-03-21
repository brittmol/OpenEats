import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getReservations, updateRes } from "../../store/reservations";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import "react-datepicker/dist/react-datepicker.css";

export default function EditResForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resId } = useParams();

  const sessionUser = useSelector((store) => store.session.user);
  const reservations = useSelector((store) => store.reservationReducer);
  const res = reservations[resId];

  console.log("reserva", reservations);
  console.log("res", res);

  const [loaded, setLoaded] = useState(false);

  const [time, setTime] = useState(null);
  const [numPpl, setNumPpl] = useState(null);
  const [specialReq, setSpecialReq] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getReservations(sessionUser.id)).then(() => setLoaded(true));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (loaded && !res) history.push("/pagenotfound");
    if (loaded && res?.userId !== sessionUser?.id)
      history.push(`/users/${sessionUser?.id}/reservations`);
  }, [loaded, res, sessionUser]);

  useEffect(() => {
    if (res) {
      setTime(new Date(res?.time));
      setNumPpl(res?.numPpl);
      setSpecialReq(res?.specialReq);
    }
  }, [res]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: res?.id,
      userId: sessionUser.id,
      restaurantId: res?.restaurantId,
      time,
      numPpl,
      specialReq,
    };

    setErrors([]);
    const updatedRes = await dispatch(updateRes(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) return setErrors(data.errors);
    });

    if (updatedRes) {
      return history.push(`/reservations/${updatedRes.id}/confirmation`);
    }
  };

  return (
    <>
      <h1>Edit your Reservation</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <DatePicker
          placeholderText="Click to select a Date"
          selected={time}
          onChange={(date) => setTime(date)}
          minDate={new Date()}
          //   filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          dateFormat="MMMM d, yyyy"
        />
        <DatePicker
          placeholderText="Click to select a Start Time"
          selected={time}
          onChange={(date) => setTime(date)}
          showTimeSelect
          showTimeSelectOnly
          filterTime={
            (time) =>
              new Date(time) > new Date().getTime() && // selected time > current time
              new Date(time) > setHours(new Date(time), 8).getTime() && // between 9am
              new Date(time) < setHours(new Date(time), 19).getTime() // and 6pm
          }
          timeFormat="h:mm aa"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="h:mm aa"
        />
        <div>
          <label htmlFor="numPpl">Party Size: </label>
          <input
            type="number"
            id="numPpl"
            name="numPpl"
            min="1"
            max="10"
            value={numPpl}
            onChange={(e) => setNumPpl(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Add a special request (optional)"
          value={specialReq}
          onChange={(e) => setSpecialReq(e.target.value)}
        />
        <button type="submit">Save Reservation</button>
      </form>
    </>
  );
}
