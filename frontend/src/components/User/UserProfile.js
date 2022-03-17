import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  // userId is a string, sessionUser.id is a number, using == will see if they are equal

  return (
    <>
      {sessionUser?.id && userId == sessionUser?.id ? (
        <>
          <h1>Account Details</h1>
          <div>
            {sessionUser?.firstName} {sessionUser?.lastName}
          </div>
          <div>{sessionUser?.username}</div>
          <div>{sessionUser?.email}</div>
        </>
      ) : sessionUser ? (
        <Redirect to={`/users/${sessionUser?.id}/profile`} />
      ) : (
        <Redirect to="/signup" />
      )}
    </>
  );
}
