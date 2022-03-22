const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');


class Users{

  constructor(){}

  async create(data){
    const newUser = await models.User.create(data)
    return newUser
  }

  async find(){
    const user = await models.User.findAll({
      include: ['customer']
    });
    return user;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user don`t exist')
    }
    return user
  }

  async update(id,change){
    const user = await this.findOne(id)
    const res = await user.update(change)
    return res
  }

  async delete(id){
    const user = await this.findOne(id)
    await user.destroy()
    return {id}
  }

}

module.exports = Users
