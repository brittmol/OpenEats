import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { createRes } from "../../store/reservations";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateResForm({ restaurant, sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  const startDateValue = () => {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateNextHr = setMinutes(setSeconds(today.addHours(1), 0), 0);
    let dateNextDay = setHours(setMinutes(setSeconds(tomorrow, 0), 0), 9);
    let dateThisDay = setHours(setMinutes(setSeconds(today, 0), 0), 9);

    let startVal =
      today.getHours() < 9
        ? dateThisDay
        : today.getHours() > 19
        ? dateNextDay
        : dateNextHr;
    return startVal;
  };

  const [time, setTime] = useState(startDateValue());
  const [numPpl, setNumPpl] = useState(2);
  const [specialReq, setSpecialReq] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      restaurantId: restaurant.id,
      time,
      numPpl,
      specialReq,
    };

    setErrors([]);
    const newRes = await dispatch(createRes(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) return setErrors(data.errors);
    });

    setTime(startDateValue());
    setNumPpl(2);
    setSpecialReq(null);
  };

  return (
    <>
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
        <button type="submit">Complete Reservation</button>
      </form>
    </>
  );
}
