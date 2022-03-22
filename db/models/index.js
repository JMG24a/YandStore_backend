const { User, UserSchema } = require('./user');
const { Customer, CustomerSchema } = require('./customer');
const { Category, CategorySchema } = require('./category');
const { Product, ProductSchema } = require('./product');
const { Order, OrderSchema } = require('./order');
const { OrderProduct, OrderProductSchema } = require('./order_HAS_product');

function setupModels(sequelize){
  //starting
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));


  // Relations
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
