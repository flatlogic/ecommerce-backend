"use strict";
const { randomUUID } = require('node:crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("brands", [
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc721',
        name: "Poliform",
        importHash: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc722',
        name: "Roche Bobois",
        importHash: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc723',
        name: "Edra",
        importHash: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc724',
        name: "Kartell",
        importHash: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
