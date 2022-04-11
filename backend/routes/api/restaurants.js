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

const { validateRestaurant } = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

// ------- SEARCH -----------------
router.post(
  "/search",
  asyncHandler(async (req, res) => {
    const { term } = req.body
    const restaurants = await Restaurant.findAll({
      where: {
        title: {
          [Op.iLike]: `%${term}%`,
        },
      },
      include: [
        {
          model: User,
        },
        {
          model: Category,
        },
      ],
    });
    return res.json(restaurants);
  })
);

// ---------------------------------

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

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findByPk(id, {
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
    return res.json(restaurant);
  })
);

router.post(
  "/",
  requireAuth,
  validateRestaurant,
  asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    const newRestaurant = await Restaurant.findByPk(restaurant.id, {
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
    return res.json(newRestaurant);
  })
);

router.put(
  "/:id",
  requireAuth,
  validateRestaurant,
  asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    const updatedRestaurant = await restaurant.update(req.body);
    const newRestaurant = await Restaurant.findByPk(updatedRestaurant.id, {
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
    return res.json(newRestaurant);
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) throw new Error("Cannot find restaurant");
    await restaurant.destroy();
    return res.json(restaurant);
  })
);

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
