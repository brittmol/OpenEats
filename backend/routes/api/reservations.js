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

const {
  validateRestaurant,
  validateReservation,
  validateReview,
} = require("../../utils/validation");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

// will put in Users ----------------
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reservations = await Reservation.findAll({
      include: [{ model: User }, { model: Restaurant }],
    });
    return res.json(reservations);
  })
);
//------------------------

router.post(
  "/",
  requireAuth,
  validateReservation,
  asyncHandler(async (req, res) => {
    const reservation = await Reservation.create(req.body);
    const newRes = await Reservation.findByPk(reservation.id, {
      include: [{ model: User }, { model: Restaurant }],
    });
    return res.json(newRes);
  })
);

router.put(
  "/:resId",
  requireAuth,
  validateReservation,
  asyncHandler(async (req, res) => {
    const { resId } = req.params;
    const reservation = await Reservation.findByPk(resId);
    const updatedRes = await reservation.update(req.body);
    const newRes = await Reservation.findByPk(updatedRes.id, {
      include: [{ model: User }, { model: Restaurant }],
    });
    return res.json(newRes);
  })
);

router.delete(
  "/:resId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { resId } = req.params;
    const reservation = await Reservation.findByPk(resId);
    if (!reservation) throw new Error("Cannot find reservation");
    await reservation.destroy();
    return res.json(reservation);
  })
);

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
