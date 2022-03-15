"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      restaurantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Restaurants" },
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      ratingOverall: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      ratingFood: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      ratingService: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      ratingAmbience: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reviews");
  },
};
