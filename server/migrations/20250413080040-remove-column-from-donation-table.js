'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    // Remove multiple columns from the 'Users' table.
    await queryInterface.removeColumn('Donations', 'address');
    await queryInterface.removeColumn('Donations', 'address2');
    await queryInterface.removeColumn('Donations', 'zip');
    await queryInterface.removeColumn('Donations', 'city');


  },

  down: async (queryInterface, Sequelize) => {
    // Since the migration is irreversible, throw an error on rollback.
    throw new Error('This migration is irreversible.');
  }
};
