"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Students",
      [
        {
          firstName: "Ghayas",
          lastName: "Mohsin",
          phoneNumber: "03017203245",
          email: "ghayasmohsin@gmail.com",
          address: "Lahore",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Farhan",
          lastName: "Yazdani",
          phoneNumber: "03017203245",
          email: "farhan@gmail.com",
          address: "Multan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Armaghan",
          lastName: "Rasheed",
          phoneNumber: "03017203245",
          email: "armaghan@gmail.com",
          address: "Multan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Waqas",
          lastName: "Yaqoob",
          phoneNumber: "03017203245",
          email: "waqas@gmail.com",
          address: "Multan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Students", null, {});
  },
};
