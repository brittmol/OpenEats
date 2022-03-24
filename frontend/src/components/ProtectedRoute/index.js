import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import PageNotFound from "../PageNotFound/PageNotFound";
import { Modal } from "../../context/Modal";
import LoginForm from "../Auth/LoginFormModal/LoginForm";
import SignupForm from "../Auth/SignupFormModal/SignupForm";
import DemoUser from "../Auth/DemoUser";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);

  const [showModal, setShowModal] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Route {...props}>
      {user ? (
        props.children
      ) : (
        <>
          <PageNotFound />
          <div>
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
          </div>
          {/* <Redirect to="/login" /> */}
        </>
      )}
    </Route>
  );
};

export default ProtectedRoute;
