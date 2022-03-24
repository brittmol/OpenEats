import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { Modal } from "../../context/Modal";
import LoginForm from "../Auth/LoginFormModal/LoginForm";
import PageNotFound from "../PageNotFound/PageNotFound";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);

  const [showModal, setShowModal] = useState(true);

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
                <LoginForm />
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
