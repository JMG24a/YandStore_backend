const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const {security, security_confirm} = require('../../middleware/securities')

class Customer{

  constructor(){}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    data.user.password = await security(data.user.password)
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async auth(data) {
    const customer = await this.findOne(data.id)
    const isAuth = await security_confirm(data.password, customer.password)
    if(!isAuth){
      throw boom.conflict('User or Password incorrect')
    }
    return isAuth;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = Customer;
