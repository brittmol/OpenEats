import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DemoUser from "../DemoUser";
import SignupForm from "../SignupFormModal/SignupForm";
import LoginForm from "./LoginForm";
import "../Auth.css";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <button className="red-btn" onClick={() => setShowModal(true)}>Log In</button>
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

export default LoginFormModal;
