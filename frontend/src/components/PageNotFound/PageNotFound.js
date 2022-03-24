import panda from "../../images/404_panda.jpg";

export default function PageNotFound() {
  return (
    <div className="panda">
      {/* <h1>Page Not Found!!!</h1> */}
      <img src={panda} alt="404 Page Not Found" />
    </div>
  );
}
