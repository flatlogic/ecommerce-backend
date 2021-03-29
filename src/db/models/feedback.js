
const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const feedback = sequelize.define(
    'feedback',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      feedback_date: {
        type: DataTypes.DATE,
      },

      rating: {
        type: DataTypes.INTEGER,
      },
      avatar: {
          type: DataTypes.STRING,
      },
      firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
      review: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM,
      
        values: [
          "visible",
          "hidden"
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

  feedback.associate = (db) => {

    db.feedback.hasMany(db.file, {
      as: 'image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.feedback.getTableName(),
        belongsToColumn: 'image',
      },
    });

    db.feedback.belongsTo(db.products, {
      as: 'product',
      constraints: false,
    });

    db.feedback.belongsTo(db.users, {
      as: 'user',
      constraints: false,
    });

    db.feedback.belongsTo(db.payments, {
      as: 'payment',
      constraints: false,
    });


    db.feedback.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.feedback.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return feedback;
};

