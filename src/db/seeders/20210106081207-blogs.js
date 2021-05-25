"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("blogs", [
      {
        id: "07aeff53-31e5-4276-8307-f855b22b6436",
        title: "Wall Murals Add Your Interior Design Maximum Escapism",
        author_name: "Hillary Johnson",
        status: "visible",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        blog_image_one_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_two_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_three_annotation: "",
        blog_image_four_annotation: "",
        blog_image_five_annotation: "",
        point_one_title: "Unmatched Toner Cartridge Quality",
        point_one_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_two_title: "One more category title",
        point_two_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_three_title: "",
        point_three_description: "",
        point_four_title: "",
        point_four_description: "",
        point_five_title: "",
        point_five_description: "",
        epigraph: "These lively patterns will give your interior the look you always wanted. Can you imagine the way it feels to turn your bedroom into a dreamy forest or warm lake?",
        first_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        second_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        third_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fourth_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fifth_paragraph: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c4245ff9-6a53-4b13-8539-0b69b442cfd1",
        title: "Amber Tones - A Sophisticated Take On Contemporary Country",
        author_name: "Phoenix Houston",
        status: "visible",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        blog_image_one_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_two_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_three_annotation: "",
        blog_image_four_annotation: "",
        blog_image_five_annotation: "",
        point_one_title: "Unmatched Toner Cartridge Quality",
        point_one_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_two_title: "One more category title",
        point_two_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_three_title: "",
        point_three_description: "",
        point_four_title: "",
        point_four_description: "",
        point_five_title: "",
        point_five_description: "",
        epigraph: "Nostalgia and comfort are the words that come to mind. Maximum coziness and simplicity create an unforgettable atmosphere. You should try this concept.",
        first_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        second_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        third_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fourth_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fifth_paragraph: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "57fbad3f-528a-43b2-83e8-32ba30708194",
        title: "Distant Shores are Waiting For You And Your Bedroom!",
        author_name: "Andreas Walter",
        status: "visible",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        blog_image_one_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_two_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_three_annotation: "",
        blog_image_four_annotation: "",
        blog_image_five_annotation: "",
        point_one_title: "Unmatched Toner Cartridge Quality",
        point_one_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_two_title: "One more category title",
        point_two_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_three_title: "",
        point_three_description: "",
        point_four_title: "",
        point_four_description: "",
        point_five_title: "",
        point_five_description: "",
        epigraph: "The getaway lifestyle was reimagined. Prepare yourself for the journey to the distant shores. It will give you a calm and relaxing atmosphere for you to always recharge yourself.",
        first_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        second_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        third_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fourth_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fifth_paragraph: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6fd75915-f1f0-447b-b144-c58c03d4df20",
        title: "Vintage Elements Were Reimagined! Use Retro Pieces and Vibrant Colours",
        author_name: "William Johnson",
        status: "visible",
        meta_description: "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development",
        keywords: "flatlogic, react templates",
        meta_author: "Flatlogic LLC.",
        meta_og_title: "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes",
        meta_og_url: "https://flatlogic-ecommerce.herokuapp.com/",
        meta_og_image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg",
        meta_fb_id: "712557339116053",
        meta_og_sitename: "Flatlogic",
        post_twitter: "@flatlogic",
        blog_image_one_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_two_annotation: "There is a lot of exciting stuff going on in the stars",
        blog_image_three_annotation: "",
        blog_image_four_annotation: "",
        blog_image_five_annotation: "",
        point_one_title: "Unmatched Toner Cartridge Quality",
        point_one_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_two_title: "One more category title",
        point_two_description: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a “living” thing because you never know what you are going to see on any given night of stargazing.",
        point_three_title: "",
        point_three_description: "",
        point_four_title: "",
        point_four_description: "",
        point_five_title: "",
        point_five_description: "",
        epigraph: "Provide plenty of contrast to stand out from the crowd. Each and every one of these vintage pieces should mean something to you. In this case, it will be loved by you.",
        first_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        second_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        third_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fourth_paragraph: "There is a lot of exciting stuff going on in the stars above us that makes astronomy so much fun. The universe is constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing. Of the many celestial phenomenons, there is probably none as exciting as when you see your first asteroid on the move in the heavens. To call asteroids the “rock stars” of astronomy is both a bad joke and an accurate depiction of how astronomy fans view them. Unlike suns, planets, and moons, asteroids are on the move, ever changing and, if they appear in the night sky, they are exciting and dynamic.",
        fifth_paragraph: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("blogs", null, {});
  },
};
