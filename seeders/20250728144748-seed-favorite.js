'use strict';
const fs = require('fs').promises;

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
    let favorites = JSON.parse(await fs.readFile('./data/favorites.json', 'utf-8'));

    favorites = favorites.map(el => {
      el.createdAt = el.updatedAt = new Date();

      return el;
    })

    await queryInterface.bulkInsert('Favorites', favorites, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};
