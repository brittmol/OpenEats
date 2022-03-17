import { useSelector } from "react-redux";

export default function UserProfile() {
  const sessionUser = useSelector((store) => store.session.user);
  console.log("user obj", sessionUser);

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
