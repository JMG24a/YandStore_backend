const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');


class Order{

  constructor(){}

  async findOne(id){
    const res = await models.Order.findByPk(id,{
      include:[
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(!res){
      throw boom.notFound('order not fount')
    }
    return res
  }

  async findByCustomer(id){
    const res = await models.Order.findAll({
      where: {
        '$customer.user.id$': id
      },
      include:[
        {
          association: 'customer',
          include: ['user']
        },
      ]
    });
    if(!res){
      throw boom.notFound('order not fount')
    }
    return res
  }


  async create(data){
    const newOrder = await models.Order.create(data)
    return{
      message: 'Create Success',
      success:newOrder
    }
  }

  async addItem(data) {
    await this.findOne(1)
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

}


module.exports = Order
