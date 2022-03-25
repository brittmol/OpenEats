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
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            alt="javascript icon"
          />
          <p>javascript</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="react icon"
          />
          <p>react</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
            alt="redux icon"
          />
          <p>redux</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg"
            alt="nodejs icon"
          />
          <p>nodejs</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
            alt="express icon"
          />
          <p>express</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"
            alt="sequelize icon"
          />
          <p>sequelize</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
            alt="postgreSQL icon"
          />
          <p>postgreSQL</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
            alt="css3 icon"
          />
          <p>css3</p>
        </div>
        <div className="img-label">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
            alt="html5 icon"
          />
          <p>html5</p>
        </div>
      </div>
    </footer>
  );
}
