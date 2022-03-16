// ------------------ IMPORTS ------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Restaurant,
  Reservation,
  Review,
  Category,
  User,
} = require("../../db/models");

// const { check } = require("express-validator");
const {
  validateRestaurant,
  validateReservation,
  validateReview,
  handleValidationErrors,
} = require("../../utils/validation");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Category,
        },
        {
          model: Reservation,
          include: [User, Restaurant],
        },
        {
          model: Review,
          include: [User, Restaurant],
        },
      ],
    });
    return res.json(restaurants);
  })
);

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
