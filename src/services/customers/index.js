const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const {security} = require('../../middleware/securities');

class Customer{

  constructor(){}

  async find() {
    const res = await models.Customer.findAll({
      include: ['user']
    });

    return res;
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
