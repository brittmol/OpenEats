import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      &copy; 2022 OpenEats by Brittany Moliver |{" "}
      <Link
        to={{
          pathname: "https://www.linkedin.com/in/brittany-moliver-5673521b2/",
        }}
        target="_blank"
      >
        <i className="fa-brands fa-linkedin"> linkedin&nbsp;</i>
      </Link>
      |
      <Link to={{ pathname: "https://github.com/brittmol" }} target="_blank">
        &nbsp;<i className="fa-brands fa-github"> github&nbsp;</i>
      </Link>
      |
    </footer>
  );
}
