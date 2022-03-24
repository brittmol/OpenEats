import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DemoUser from "../DemoUser";
import SignupForm from "../SignupFormModal/SignupForm";
import LoginForm from "./LoginForm";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {showLogin ? (
            <>
              <LoginForm />
              <p>
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
              <p>
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
          <p>
            Want to login as a Guest?
            <DemoUser />
          </p>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
