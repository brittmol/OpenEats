import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-links">
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
      </div>
      <div className="footer-imgs">
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
          <p>javascript</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
          <p>react</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
          <p>redux</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" />
          <p>nodejs</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
          <p>express</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" />
          <p>sequelize</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
          <p>postgreSQL</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
          <p>css3</p>
        </div>
        <div className="img-label">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
          <p>html5</p>
        </div>
      </div>
    </footer>
  );
}
