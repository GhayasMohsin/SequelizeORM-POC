"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Class.init(
    {
      name: DataTypes.STRING,
      section: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );

  return Class;
};
