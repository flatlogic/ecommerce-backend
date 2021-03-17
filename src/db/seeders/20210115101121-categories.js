"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc711',
        title: "furniture",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc712',
        title: "lighting",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc713',
        title: "decoration",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc714',
        title: "bedding",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc715',
        title: "bath & shower",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc716',
        title: "curtains",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc717',
        title: "toys",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
