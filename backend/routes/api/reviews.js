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

const { validateReview } = require("../../utils/validation");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      include: [{ model: User }, { model: Restaurant }],
    });
    return res.json(reviews);
  })
);

// get one
router.get("/:revId", asyncHandler(async (req, res) => {
    const { revId } = req.params;
    const review = await Review.findByPk(revId);
    return res.json(review)
}))
//

router.post(
  "/",
  requireAuth,
  validateReview,
  asyncHandler(async (req, res) => {
    const review = await Review.create(req.body);
    const newRev = await Review.findByPk(review.id, {
      include: [{ model: User }, { model: Restaurant }],
    });
    return res.json(newRev);
  })
);

router.put(
  "/:revId",
  requireAuth,
  validateReview,
  asyncHandler(async (req, res) => {
    const { revId } = req.params;
    const review = await Review.findByPk(revId);
    const updatedRev = await review.update(req.body);
    const newRev = await Review.findByPk(updatedRev.id, {
      include: [{ model: User }, { model: Restaurant }],
    });
    return res.json(newRev);
  })
);

router.delete(
  "/:revId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { revId } = req.params;
    const review = await Review.findByPk(revId);
    if (!review) throw new Error("Cannot find review");
    await review.destroy();
    return res.json(review);
  })
);

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
