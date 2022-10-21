'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [      
        {
          name: 'superadmin',
          email: 'superadmin@email.com',
          password: await bcrypt.hash("superadmin", 10), //setup with bcrypt encrypt
          roles:"superadmin",
          createdAt : new Date(),
          updatedAt : new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};