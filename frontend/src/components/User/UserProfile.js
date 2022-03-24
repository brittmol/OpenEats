import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import "./User.css";

export default function UserProfile() {
  const history = useHistory();
  const { userId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);

  useEffect(() => {
    if (sessionUser?.id !== userId) {
      history.push(`/users/${sessionUser?.id}/profile`);
    }
  }, [sessionUser, history, userId]);

  // userId is a string, sessionUser.id is a number, using == will see if they are equal

  // if user is not same user as userId, history.push
  // if user is not logged in, redirect to login
  return (
    <div className="user-account">
      <h1>Account Details</h1>
      <div>
        {" "}
        Name:&emsp;&emsp;&emsp;
        {sessionUser?.firstName} {sessionUser?.lastName}
      </div>
      <div>Username:&emsp; {sessionUser?.username}</div>
      <div>Email:&emsp;&emsp;&emsp; {sessionUser?.email}</div>
      <br></br>
      <br></br>

      <button className="red-btn">
        <Link to="/create-restaurant">
          Want to put your restaurant on OpenEats?
        </Link>
      </button>
    </div>
  );
}
