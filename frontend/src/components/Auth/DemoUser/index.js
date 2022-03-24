import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";

export default function DemoUser() {
  const dispatch = useDispatch();
  const demoLogin = () => {
    dispatch(
      login({
        credential: "demo@user.io",
        password: "password",
      })
    );
  };
  return (
    <button className="red-font-btn" onClick={demoLogin}>
      Demo User
    </button>
  );
}
