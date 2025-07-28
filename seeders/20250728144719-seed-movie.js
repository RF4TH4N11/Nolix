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
    let movies = JSON.parse(await fs.readFile('./data/movies.json', 'utf-8'));

    movies = movies.map(el => {
      el.createdAt = el.updatedAt = new Date();

      return el;
    })

    await queryInterface.bulkInsert('Movies', movies, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movies', null, {
      truncate: true,
      restartIdentity: true
    });
  }
};
