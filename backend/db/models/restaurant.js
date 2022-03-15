'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant.init({
    ownerId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    ratingOverall: DataTypes.FLOAT,
    ratingFood: DataTypes.FLOAT,
    ratingService: DataTypes.FLOAT,
    ratingAmbience: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};