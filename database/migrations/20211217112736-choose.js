'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize.DataTypes
    await queryInterface.createTable( 'chooses', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      course_id: INTEGER,
      course_name: STRING,
      capacity: INTEGER,
      number: INTEGER,
      day: INTEGER,
      time: INTEGER,
      created_at: DATE,
      updated_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chooses')
  }
};
