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

const { validateReservation } = require("../../utils/validation");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Restaurant,
          include: [Category],
        },
      ],
    });
    return res.json(reservations);
  })
);

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const reservation = await Reservation.findByPk(id, {
//       include: [
//         {
//           model: User,
//         },
//         {
//           model: Restaurant,
//           include: [Category],
//         },
//       ],
//     });
//     return res.json(reservation);
//   })
// );

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
