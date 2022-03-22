//dependencies
const boom = require('@hapi/boom')
const { models } = require('../../libs/sequelize')

class Categories{
  constructor(){}

  async find(){
    const res = await models.Category.findAll()
    return res
  }

  async findOne(id){
    const res = await models.Category.findByPk(id,{
      include: ['products']
    })
    if(!res){
      throw boom.notFound('Category not fount')
    }
    return res
  }

  async create(body){
    try{
      const newCategory = await models.Category.create(body)

      return newCategory

    }catch(err){
      throw boom.conflict('Your petition is not valid')
    }
  }

  async update(id, change){
    const category = await this.findOne(id)
    const res = await category.update(change)
    return res
  }

  async delete(id){
    const category = await this.findOne(id)
    const res = await category.destroy()
    return {
      message:"Success Delete",
      success: res
    }
  }
}

module.exports = Categories
