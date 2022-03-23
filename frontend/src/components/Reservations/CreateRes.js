import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import DatePicker from "react-datepicker";
import { createRes } from "../../store/reservations";
import { getRestaurants } from "../../store/restaurants";

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateResForm({ restId, sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

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
  const [specialReq, setSpecialReq] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // console.log("errors", errors);

  useEffect(() => {
    if (sessionUser) {
      setShowModal(false);
      const newErrors = errors.filter((e) => e !== "Unauthorized");
      setErrors(newErrors);
      history.push(`/restaurants/${restId}`);
    }
  }, [sessionUser, history, restId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // sessionUser ? setShowModal(true) : setShowModal(false);
    if (!sessionUser) {
      setShowModal(true);
    }

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
      <form onSubmit={handleSubmit} className="rsv-form">
        <div className="panel-header">Make a Reservation</div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm />
            </Modal>
          )}
        </div>
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
