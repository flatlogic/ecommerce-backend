
const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const blogs = sequelize.define(
    'blogs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
      
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
      author_name: {
        type: DataTypes.STRING(255),
      },
      blog_image_one_annotation: {
        type: DataTypes.STRING(255),
      },
      blog_image_two_annotation: {
        type: DataTypes.STRING(255),
      },
      blog_image_three_annotation: {
        type: DataTypes.STRING(255),
      },
      blog_image_four_annotation: {
        type: DataTypes.STRING(255),
      },
      blog_image_five_annotation: {
        type: DataTypes.STRING(255),
      },
      point_one_title: {
        type: DataTypes.TEXT,
      },
      point_one_description: {
        type: DataTypes.TEXT,
      },
      point_two_title: {
        type: DataTypes.TEXT,
      },
      point_two_description: {
        type: DataTypes.TEXT,
      },
      point_three_title: {
        type: DataTypes.TEXT,
      },
      point_three_description: {
        type: DataTypes.TEXT,
      },
      point_four_title: {
        type: DataTypes.TEXT,
      },
      point_four_description: {
        type: DataTypes.TEXT,
      },
      point_five_title: {
        type: DataTypes.TEXT,
      },
      point_five_description: {
        type: DataTypes.TEXT,
      },
      epigraph: {
          type: DataTypes.TEXT,
      },
      first_paragraph: {
        type: DataTypes.TEXT,
      },
      second_paragraph: {
        type: DataTypes.TEXT,
      },
      third_paragraph: {
        type: DataTypes.TEXT,
      },
      fourth_paragraph: {
        type: DataTypes.TEXT,
      },
      fifth_paragraph: {
        type: DataTypes.TEXT,
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

  blogs.associate = (db) => {

    db.blogs.belongsToMany(db.categories, {
      as: 'categories',
      constraints: false,
      through: 'blogsCategoriesCategories',
    });

    db.blogs.belongsToMany(db.blogs, {
      as: 'more_blogs',
      constraints: false,
      through: 'blogsMore_blogsBlogs',
    });

    db.blogs.belongsTo(db.brands, {
      as: 'brand',
      constraints: false,
    });

    db.blogs.hasMany(db.file, {
      as: 'hero_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.blogs.getTableName(),
        belongsToColumn: 'hero_image',
      },
    });

    db.blogs.hasMany(db.file, {
        as: 'blog_image_one',
        foreignKey: 'belongsToId',
        constraints: false,
        scope: {
            belongsTo: db.blogs.getTableName(),
            belongsToColumn: 'blog_image_one',
        },
    });

    db.blogs.hasMany(db.file, {
        as: 'blog_image_two',
        foreignKey: 'belongsToId',
        constraints: false,
        scope: {
            belongsTo: db.blogs.getTableName(),
            belongsToColumn: 'blog_image_two',
        },
    });

    db.blogs.hasMany(db.file, {
        as: 'blog_image_three',
        foreignKey: 'belongsToId',
        constraints: false,
        scope: {
            belongsTo: db.blogs.getTableName(),
            belongsToColumn: 'blog_image_three',
        },
    });

    db.blogs.hasMany(db.file, {
        as: 'author_avatar',
        foreignKey: 'belongsToId',
        constraints: false,
        scope: {
          belongsTo: db.blogs.getTableName(),
          belongsToColumn: 'author_avatar',
        },
      });


    db.blogs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.blogs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return blogs;
};

