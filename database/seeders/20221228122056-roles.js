'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('roles', null, { truncate:true }),
      queryInterface.bulkInsert('roles', [
        {
          role_id: 1, role: 'Admin', created_at: new Date(), updated_at: new Date(),
        },
        {
          role_id: 2, role: 'User', created_at: new Date(), updated_at: new Date(),
        }
      ], { truncate: true }),
    ]);
  },

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {truncate: true })
};
