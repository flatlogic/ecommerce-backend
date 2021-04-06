"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc711',
        title: "furniture",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc712',
        title: "lighting",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc713',
        title: "decoration",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc714',
        title: "bedding",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc715',
        title: "bath & shower",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc716',
        title: "curtains",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1fcb7ece-6373-405d-92ef-3f3c4e7dc717',
        title: "toys",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        importHash: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
