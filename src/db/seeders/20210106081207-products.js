"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products", [
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1861",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc721',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "out of stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1862",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc722',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1863",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc723',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1864",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc724',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1865",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc721',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1866",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc722',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1867",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc723',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1868",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc724',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "afaf98d5-4060-4408-967b-c4f4af3d1869",
        title: "Awesome products Name",
        brandId: '1fcb7ece-6373-405d-92ef-3f3c4e7dc721',
        price: 70,
        discount: 0,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        rating: 4,
        status: "in stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
