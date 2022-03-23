import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      &copy; 2022 OpenEats by Brittany Moliver{" "}
      <Link
        to={{
          pathname: "https://www.linkedin.com/in/brittany-moliver-5673521b2/",
        }}
        target="_blank"
      >
        | <i class="fa-brands fa-linkedin"> linkedin |</i>
      </Link>
      <Link to={{ pathname: "https://github.com/brittmol" }} target="_blank">
        | <i class="fa-brands fa-github"> github |</i>
      </Link>
    </footer>
  );
}
