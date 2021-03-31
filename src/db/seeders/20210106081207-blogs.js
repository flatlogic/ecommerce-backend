"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products", [
      {
        id: "07aeff53-31e5-4276-8307-f855b22b6436",
        title: "The beauty of astronomy is that anybody can do it",
        author_name: "William Johnson",
        status: "visible",
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
        epigraph: "The universe is a constantly changing and moving. Some would say it’s a living thing because you never know what you are going to see on any given night of stargazing.",
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
