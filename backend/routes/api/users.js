// ------------------ IMPORTS ------------------------------------------
const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { validateSignup } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Restaurant,
  Reservation,
  Review,
  Category,
  User,
} = require("../../db/models");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

// Sign up
router.post(
  "",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    const user = await User.signup({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

// User Profile Routes
router.get(
  "/:id/profile",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    return res.json(user);
  })
);

router.get(
  "/:id/reservations",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reservations = await Reservation.findAll({
      where: { userId: id },
      include: [{ model: User }, { model: Restaurant }],
    });
    return res.json(reservations);
  })
);

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
