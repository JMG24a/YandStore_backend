'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require("../models/customer");

module.exports = {
  up: async  (queryInterface)=>{

    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);

  },

  down: async  (queryInterface)=>{

    await queryInterface.dropTable(CUSTOMER_TABLE);

  }
};
