import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import DemoUser from "../DemoUser";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import "../Auth.css";

export default function CheckLogin() {
  const sessionUser = useSelector((store) => store.session.user);

  const [showModal, setShowModal] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (sessionUser) return setShowModal(false);
  }, [sessionUser]);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {showLogin ? (
            <>
              <LoginForm />
              <p className="modal-form-p">
                Don't have an account?
                <button
                  className="red-font-btn"
                  onClick={() => setShowLogin(false)}
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <SignupForm />
              <p className="modal-form-p">
                Already have an account?
                <button
                  className="red-font-btn"
                  onClick={() => setShowLogin(true)}
                >
                  Log In
                </button>
              </p>
            </>
          )}
          <p className="modal-form-p">
            Want to login as a Guest?
            <DemoUser />
          </p>
        </Modal>
      )}
    </>
  );
}
