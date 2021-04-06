"use strict";
const bcrypt = require("bcrypt");
const config = require("../../config");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let hash = bcrypt.hashSync(config.admin_pass, config.bcrypt.saltRounds);
    let hash2 = bcrypt.hashSync(config.client_pass, config.bcrypt.saltRounds);

    return queryInterface.bulkInsert("users", [
      {
        id: '7facf8cc-0af5-448a-a17c-84bbf22f2ded',
        firstName: "Admin",
        lastName: "Hero",
        email: config.admin_email,
        emailVerified: true,
        role: "admin",
        provider: config.providers.LOCAL,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7facf8cc-0af5-448a-a17c-84bbf22f2de6',
        firstName: "Customer",
        lastName: "Johnson",
        email: 'customer@flatlogic.com',
        emailVerified: true,
        role: "user",
        provider: config.providers.LOCAL,
        password: hash2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
