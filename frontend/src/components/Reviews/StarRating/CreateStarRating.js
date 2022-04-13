import React, { useState } from "react";
import "./StarRating.css";

export default function CreateStarRating({ label, rating, setRating }) {
  // const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      <p>
        {label}
        {[...Array(5)].map((star, i) => {
          i += 1;
          return (
            <button
              type="button"
              key={i}
              id="starRatingBtn"
              // className={i <= rating ? "on" : "off"}
              className={i <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
              {/* &#9733; is HTML for star icon */}
            </button>
          );
        })}
      </p>
    </div>
  );
}
