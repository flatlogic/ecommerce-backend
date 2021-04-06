
const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const products = sequelize.define(
    'products',
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
      price: {
        type: DataTypes.DECIMAL,
      
      },
      discount: {
        type: DataTypes.DECIMAL,
      
      },
      description: {
        type: DataTypes.TEXT,
      
      },
      rating: {
        type: DataTypes.INTEGER,
      
      },
      status: {
        type: DataTypes.ENUM,
      
        values: [
          "in stock",
          "out of stock"
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

  products.associate = (db) => {

    db.products.belongsToMany(db.categories, {
      as: 'categories',
      constraints: false,
      through: 'productsCategoriesCategories',
    });

    db.products.belongsToMany(db.products, {
      as: 'more_products',
      constraints: false,
      through: 'productsMore_productsProducts',
    });

    db.products.belongsTo(db.brands, {
      as: 'brand',
      constraints: false,
    });

    db.products.hasMany(db.file, {
      as: 'image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.products.getTableName(),
        belongsToColumn: 'image',
      },
    });


    db.products.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.products.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return products;
};

