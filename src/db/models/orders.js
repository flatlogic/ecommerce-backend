
const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_date: {
        type: DataTypes.DATE,
      
      },
      amount: {
        type: DataTypes.INTEGER,
      
      },
      status: {
        type: DataTypes.ENUM,
      
        values: [
          "in cart",
          "bought"
        ],

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  orders.associate = (db) => {

    db.orders.belongsTo(db.products, {
      as: 'product',
      constraints: false,
    });

    db.orders.belongsTo(db.users, {
      as: 'user',
      constraints: false,
    });

    db.orders.belongsTo(db.payments, {
      as: 'payment',
      constraints: false,
    });


    db.orders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return orders;
};

