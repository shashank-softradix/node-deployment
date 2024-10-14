"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.bulkDelete('users', null, { truncate:true }),
      queryInterface.bulkInsert(
        "users",
        [
          {
            id:1,
            role_id: 1,
            first_name: "Rahul",
            email: "rahulrana123@yopmail.com",
            phone_number: "9090908885",
            password:
              "$2b$10$YHHTS.HW58MA1GNTTiipPuD5vzu5rw/5s.zsWi/OBC1hr4cohQesq",
            uuid: "7cedacea-87fa-4212-b3f0-bd3b5c7c21d8",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { truncate: true }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
