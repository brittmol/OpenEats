import React, { useEffect, useState } from "react";
import "./StarRating.css";

export default function StarRating({ rating }) {
  
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {
        i += 1;
        return (
          <button
            type="button"
            key={i}
            id="starRatingBtn"
            className={i <= rating ? "on" : "off"}
          >
            <span className="star">&#9733;</span>
            {/* &#9733; is HTML for star icon */}
          </button>
        );
      })}
    </div>
  );
}
