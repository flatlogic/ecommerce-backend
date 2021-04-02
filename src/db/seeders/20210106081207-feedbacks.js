"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("feedbacks", [
      {
        id: "493abbed-369b-4dd7-b59b-00ed9ab280cf",
        feedback_date: new Date(),
        rating: 5,
        avatar: "",
        firstname: "John",
        lastname: "Smith",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        status: "visible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ff5ff18b-713e-45e9-aec8-3920efa0c8cc",
        feedback_date: new Date(),
        rating: 5,
        avatar: "",
        firstname: "Bill",
        lastname: "Harrison",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        status: "visible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "793e0cf3-a016-4f3e-b12b-ada5bc50f32c",
        feedback_date: new Date(),
        rating: 5,
        avatar: "",
        firstname: "Robert",
        lastname: "Richardson",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        status: "visible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f39c8db3-501e-45be-8586-a597d069a2e0",
        feedback_date: new Date(),
        rating: 5,
        avatar: "",
        firstname: "Jane",
        lastname: "Dobson",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.",
        status: "visible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("feedbacks", null, {});
  },
};
