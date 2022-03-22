'use strict';
const { ORDER_TABLE, OrderSchema } = require('../models/order')
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order_HAS_product')

module.exports = {
  up: async  (queryInterface) =>{
    await queryInterface.createTable(ORDER_TABLE,OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductSchema);
  },

  down: async (queryInterface) =>{

    await queryInterface.dropTable('orders');
  }
};
