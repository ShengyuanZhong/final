'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize.DataTypes
    await queryInterface.createTable( 'courses', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING,
      capacity: INTEGER,
      day: INTEGER,
      time: INTEGER,
      number: INTEGER,
      created_at: DATE,
      updated_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses')
  }
};
