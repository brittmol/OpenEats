// ------------------ IMPORTS ------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Category } = require("../../db/models");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await Category.findAll();
    return res.json(categories);
  })
);

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
