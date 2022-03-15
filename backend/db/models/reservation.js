"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User, { foreignKey: "userId" });
      Reservation.belongsTo(models.Restaurant, { foreignKey: "restaurantId" });
    }
  }
  Reservation.init(
    {
      userId: DataTypes.INTEGER,
      restaurantId: DataTypes.INTEGER,
      time: DataTypes.DATE,
      numPpl: DataTypes.INTEGER,
      specialReq: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
