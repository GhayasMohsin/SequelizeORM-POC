"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Student, {
      //   as: "students",
      //   foreignKey: "id"
      // })

      // this.hasOne(models.Class, {
      //   as: "classId",
      //   foreignKey: "id"
      // })
    }
  }

  Teacher.init(
    {
      name: DataTypes.STRING,
      subject: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
  
  return Teacher;
};
