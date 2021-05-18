'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      discordId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      permissions: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      emailVerifiedAt: {
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      age: {
        type: Sequelize.INTEGER
      },
      bio: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      xp: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};