"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("files", [
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1861",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product1.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1862",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product2.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1863",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product3.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/3.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/3.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1864",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product4.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/4.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/4.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1865",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product5.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/5.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/5.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1865",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product1.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1-center.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1-center.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1865",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product1.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1-left.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1-left.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1865",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product1.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1-right.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1-right.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1866",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product6.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/6.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/6.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1867",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product7.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/7.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/7.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1868",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product8.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/8.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/8.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        belongsTo: "products",
        belongsToColumn: "image",
        belongsToId: "afaf98d5-4060-4408-967b-c4f4af3d1869",
        createdById: null,
        deletedAt: null,
        id: uuidv4(),
        name: "product9.png",
        privateUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/9.png",
        publicUrl: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/9.png",
        sizeInBytes: 2012,
        updatedById: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("files", null, {});
  },
};
