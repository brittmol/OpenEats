"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.belongsTo(models.User, { foreignKey: "ownerId" });
      Restaurant.belongsTo(models.Category, { foreignKey: "categoryId" });
      Restaurant.hasMany(models.Photo, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Restaurant.hasMany(models.Reservation, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Restaurant.hasMany(models.Review, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
        hooks: true,
      });
      // relationship to FavRestaurant
    }
  }
  Restaurant.init(
    {
      ownerId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      zipCode: DataTypes.INTEGER,
      ratingOverall: DataTypes.FLOAT,
      ratingFood: DataTypes.FLOAT,
      ratingService: DataTypes.FLOAT,
      ratingAmbience: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
