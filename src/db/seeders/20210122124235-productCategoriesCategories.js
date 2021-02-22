"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("productsCategoriesCategories", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1861',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc712'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1862',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc713'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1863',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc711'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1864',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc712'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1865',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc711'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1866',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc713'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1867',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc714'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1868',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc713'
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 'afaf98d5-4060-4408-967b-c4f4af3d1869',
        categoryId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc711'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("productsCategoriesCategories", null, {});
  },
};
