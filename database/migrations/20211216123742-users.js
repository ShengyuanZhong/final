'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize.DataTypes
    await queryInterface.createTable( 'users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      number: STRING,
      name: STRING,
      password: STRING,
      admin: INTEGER,
      created_at: DATE,
      updated_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
};
