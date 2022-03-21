import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

export default function UserProfile() {
  const history = useHistory();
  const { userId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);

  useEffect(() => {
    if (!sessionUser) {
      history.push("/login");
    }
    if (sessionUser && sessionUser?.id !== userId) {
      history.push(`/users/${sessionUser?.id}/profile`);
    }
  }, [sessionUser, history, userId]);

  // userId is a string, sessionUser.id is a number, using == will see if they are equal

  // if user is not same user as userId, history.push
  // if user is not logged in, redirect to login
  return (
    <>
      <h1>Account Details</h1>
      <div>
        {sessionUser?.firstName} {sessionUser?.lastName}
      </div>
      <div>{sessionUser?.username}</div>
      <div>{sessionUser?.email}</div>
    </>
  );
}
