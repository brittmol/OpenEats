import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRes } from "../../store/reservations";
import { getRestaurants } from "../../store/restaurants";
import CheckLogin from "../Auth/CheckLogin";
import { startDateValue } from "./functions";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import "react-datepicker/dist/react-datepicker.css";
import "../Auth/Auth.css";

export default function CreateResForm({ restId, sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const [time, setTime] = useState(startDateValue());
  const [numPpl, setNumPpl] = useState(2);
  const [specialReq, setSpecialReq] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (sessionUser) {
      const newErrors = errors.filter((e) => e !== "Unauthorized");
      setErrors(newErrors);
      history.push(`/restaurants/${restId}`);
    }
  }, [sessionUser, history, restId, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser?.id,
      restaurantId: restId,
      time,
      numPpl,
      specialReq,
    };

    setErrors([]);
    const newRes = await dispatch(createRes(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) return setErrors(data.errors);
    });

    if (newRes) {
      setTime(startDateValue());
      setNumPpl(2);
      setSpecialReq("");
      return history.push(`/reservations/${newRes.id}/confirmation`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="panel-header">Make a Reservation</div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="errors">
              {error}
              {error === "Unauthorized" ? <CheckLogin /> : null}
            </li>
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
        <div>
          <textarea
            placeholder="Add a special request (optional)"
            value={specialReq}
            onChange={(e) => setSpecialReq(e.target.value)}
          />
        </div>
        <button type="submit" className="red-btn">
          Find a Table
        </button>
      </form>
    </>
  );
}
