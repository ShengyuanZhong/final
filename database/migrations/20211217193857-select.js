'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, } = Sequelize.DataTypes
    await queryInterface.createTable( 'selects', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER,
      course_id: INTEGER,
      day:INTEGER,
      time:INTEGER,
      created_at: DATE,
      updated_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('selects')
  }
};
