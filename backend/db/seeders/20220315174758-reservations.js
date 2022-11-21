"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reservations";
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        restaurantId: 1,
        time: new Date(),
        numPpl: 2,
        specialReq: "Birthday Dinner",
      },
      {
        userId: 1,
        restaurantId: 1,
        time: new Date(),
        numPpl: 4,
      },
      {
        userId: 1,
        restaurantId: 1,
        time: new Date(),
        numPpl: 6,
        specialReq: "Party",
      },
      {
        userId: 1,
        restaurantId: 2,
        time: new Date(),
        numPpl: 2,
      },
      {
        userId: 1,
        restaurantId: 2,
        time: new Date(),
        numPpl: 2,
      },
      {
        userId: 1,
        restaurantId: 3,
        time: new Date(),
        numPpl: 2,
        specialReq: "Date night",
      },
      {
        userId: 1,
        restaurantId: 3,
        time: new Date(),
        numPpl: 10,
        specialReq: "Promotion",
      },
      {
        userId: 1,
        restaurantId: 4,
        time: new Date(),
        numPpl: 2,
      },
      {
        userId: 1,
        restaurantId: 4,
        time: new Date(),
        numPpl: 4,
        specialReq: "Family event",
      },
      {
        userId: 1,
        restaurantId: 5,
        time: new Date(),
        numPpl: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reservations";
    return queryInterface.bulkDelete(options);
  },
};
