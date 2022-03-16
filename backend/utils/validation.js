const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

// ---------------- Validation Middlewares for Routes ---------------------

const validateRestaurant = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title for your Restaurant."),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an address for your spot."),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a city for your spot."),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a state for your spot."),
  check("zipCode")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a zip code for your spot.")
    .isLength({ min: 5, max: 5 })
    .withMessage("Please provide a valid zip code."),
  handleValidationErrors,
];

const validateReview = [
  check("comment")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a review of this restaurant."),
  check("ratingOverall")
    .isNumeric().isLength({ min: 1, max: 5 })
    .withMessage("Please rate your overall experience from 1 to 5"),
  check("ratingFood")
    .isNumeric().isLength({ min: 1, max: 5 })
    .withMessage("Please rate the restaurant's food from 1 to 5"),
  check("ratingService")
    .isNumeric().isLength({ min: 1, max: 5 })
    .withMessage("Please rate the restaurant's service from 1 to 5"),
  check("ratingAmbience")
    .isNumeric().isLength({ min: 1, max: 5 })
    .withMessage("Please rate the restaurant's ambience from 1 to 5"),
  handleValidationErrors,
];

const validateReservation = [
  check("time")
    .isDate()
    .withMessage("Please provide a valid date and time for your reservation."),
  check("numPpl")
    .exists({ checkFalsy: true })
    .withMessage("Please provide the number of people for your reservation.")
    .isNumeric().isLength({ min: 1, max: 10 })
    .withMessage("Please provide between 1 and 10 people for your reservation."),
  handleValidationErrors,
];

// ---------------- Exports -----------------------------------------------

module.exports = {
  validateRestaurant,
  validateReservation,
  validateReview,
};
