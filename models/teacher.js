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
      this.hasMany(models.Student, {
        foreignKey: {
          name: "teacherId",
          allowNull: false,
        },
      });

      this.belongsToMany(models.Class, {
        through: "Teacher_Class",
        foreignKey:{
          name: "teacherId"
        },
        allowNull: true,
      });
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
