'use strict';

const { USER_TABLE } = require('../models/user')

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(USER_TABLE,
      'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    });
  },
};
