const joi = require('joi')
//params
const id = joi.number().integer();
//body
const title = joi.string().min(3).max(24);
const price = joi.number().integer().min(10);
const description = joi.string();
const image = joi.string();
const categoryId = joi.number().integer();
//query
const limit = joi.string();
const offset = joi.string();
const priceMin = joi.string();
const priceMax = joi.string();


const createProductSchema = joi.object({
  title: title.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = joi.object({
  title,
  price,
  image,
  categoryId
})


const getProductSchema = joi.object({
  id: id.required()
})

const queryProductSchema = joi.object({
  limit,
  offset,
  priceMin,
  priceMax: priceMax.when('priceMin', { is: true, then: joi.required() }),
})


module.exports = {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema}

