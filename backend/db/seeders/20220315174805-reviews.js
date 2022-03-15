"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 1,
          restaurantId: 1,
          comment: "Great place!",
          ratingOverall: 5,
          ratingFood: 5,
          ratingService: 5,
          ratingAmbience: 5,
        },
        {
          userId: 2,
          restaurantId: 1,
          comment: "had an okay time",
          ratingOverall: 3,
          ratingFood: 2,
          ratingService: 5,
          ratingAmbience: 1,
        },
        {
          userId: 3,
          restaurantId: 1,
          comment: "loved this place!",
          ratingOverall: 5,
          ratingFood: 4,
          ratingService: 4,
          ratingAmbience: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
