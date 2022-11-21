"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        firstName: "Demo",
        lastName: "Lition",
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        firstName: "Fake1",
        lastName: "User1",
        email: faker.internet.email(),
        username: "FakeUser1",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        firstName: "Fake2",
        lastName: "User2",
        email: faker.internet.email(),
        username: "FakeUser2",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Users";
    return queryInterface.bulkDelete(options);
  },
};
