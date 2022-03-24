import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DemoUser from "../DemoUser";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "./SignupForm";
import "../Auth.css";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  return (
    <>
      <button
        className="red-btn"
        style={{ marginLeft: "10px" }}
        onClick={() => setShowModal(true)}
      >
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {showSignup ? (
            <>
              <SignupForm />
              <p className="modal-form-p">
                Already have an account?
                <button
                  className="red-font-btn"
                  onClick={() => setShowSignup(false)}
                >
                  Log In
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p className="modal-form-p">
                Don't have an account?{" "}
                <button
                  className="red-font-btn"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
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

export default SignupFormModal;
