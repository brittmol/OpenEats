import "./StarRating.css";

export default function StarRating(rating) {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {
        i += 1;
        return (
          <button
            id="starRatingBtn"
            type="button"
            key={i}
            className={i <= rating ? "on" : "off"}
            //   className={i <= (hover || rating) ? "on" : "off"}
          >
            <span className="star">&#9733;</span>
            {/* &#9733; is HTML for star icon */}
          </button>
        );
      })}
    </div>
  );
}
