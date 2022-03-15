"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MenuItem.belongsTo(models.Restaurant, { foreignKey: "restaurantId" });
    }
  }
  MenuItem.init(
    {
      restaurantId: DataTypes.INTEGER,
      food: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "MenuItem",
    }
  );
  return MenuItem;
};
