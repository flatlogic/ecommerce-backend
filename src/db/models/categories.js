
const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const categories = sequelize.define(
    'categories',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
      
      },
      meta_description: {
        type: DataTypes.TEXT,
      },
      keywords: {
        type: DataTypes.TEXT,
      },
      meta_author: {
        type: DataTypes.TEXT,
      },
      meta_og_title: {
        type: DataTypes.TEXT,
      },
      meta_og_url: {
        type: DataTypes.TEXT,
      },
      meta_og_image: {
        type: DataTypes.TEXT,
      },
      meta_fb_id: {
        type: DataTypes.TEXT,
      },
      meta_og_sitename: {
        type: DataTypes.TEXT,
      },
      post_twitter: {
        type: DataTypes.TEXT,
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

  categories.associate = (db) => {


    db.categories.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.categories.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return categories;
};

