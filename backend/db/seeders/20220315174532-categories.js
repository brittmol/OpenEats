"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Categories";
    return queryInterface.bulkInsert(options, [
      { type: "American" }, // 1
      { type: "Caribbean" }, // 2
      { type: "Chinese" }, // 3
      { type: "Cuban" }, // 4
      { type: "French" }, // 5
      { type: "Greek" }, // 6
      { type: "Indian" }, // 7
      { type: "Italian" }, // 8
      { type: "Japanese" }, // 9
      { type: "Latin American" }, // 10
      { type: "Mediterranean" }, // 11
      { type: "Mexican" }, // 12
      { type: "Middle Easter" }, // 13
      { type: "Seafood" }, // 14
      { type: "South American" }, // 15
      { type: "Spanish" }, // 16
      { type: "Steakhouse" }, // 17
      { type: "Thai" }, // 18
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Categories";
    return queryInterface.bulkDelete(options);
  },
};
