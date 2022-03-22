const joi = require('joi');

const id = joi.number().integer()
const title = joi.string().min(3).max(20);

const getCategoriesSchema = joi.object({
  id: id.required()
});

const createCategorySchema = joi.object({
  title: title.required()
});


module.exports = { getCategoriesSchema, createCategorySchema }
