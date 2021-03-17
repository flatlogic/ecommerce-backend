"use strict";
const bcrypt = require("bcrypt");
const config = require("../../config");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let hash = bcrypt.hashSync(config.admin_pass, config.bcrypt.saltRounds);

    return queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        firstName: "Admin",
        email: config.admin_email,
        emailVerified: true,
        role: "admin",
        provider: config.providers.LOCAL,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
