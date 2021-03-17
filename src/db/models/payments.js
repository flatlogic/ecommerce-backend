
const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const payments = sequelize.define(
    'payments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      payment_date: {
        type: DataTypes.DATE,
      
      },
      amount: {
        type: DataTypes.DECIMAL,
      
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

  payments.associate = (db) => {


    db.payments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.payments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return payments;
};

