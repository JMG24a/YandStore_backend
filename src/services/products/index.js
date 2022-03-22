const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const  { models } = require('../../libs/sequelize')

class Products{

  constructor(){}

  async find(query){
    const options = {
      include: ['category'],
      where: {}
    }

    const {
      limit,
      offset,
      priceMin,
      priceMax
    } = query

    console.log('min|max parameters: !!!!!!',priceMin,priceMax)

    if(limit && offset){
      options.limit = limit,
      options.offset = offset
    }

    if(priceMin && priceMax){
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax
      };
    }

    const res = await models.Product.findAll(options);
    return res
  }

  findOne(id){
    const product = this.products.find(item => item.id === id)
    if(product === undefined){
      throw boom.notFound('product not fount')
    }
    return product
  }

  async create(body){
    const newProduct = await models.Product.create(body)
    return {
      message: "Create success",
      success: newProduct
    }
  }

  async update(id, body){

    let index = this.products.findIndex(item => item.id === id)

    if(index === -1){
      throw boom.notFound('product not fount')
    }

    const updateProduct = this.products

    updateProduct[index] = {
      ...this.products[index],
      ...body
    }

    return 'Success Update'
  }

  delete(id){
    const index = this.products.findIndex(item => item.id === id);

    if(index === -1){
      throw boom.notFound('product not fount')
    }

    delete(this.products[index])
    return 'Success Delete'
  }

}

module.exports = Products;
