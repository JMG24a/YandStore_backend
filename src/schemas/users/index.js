const joi = require('joi')


const id = joi.number().integer();
const email = joi.string();
const password = joi.string().min(3);
const role = joi.string().max(12)

const createUserSchema = joi.object({
  email: email.required(),
  password: password.required()
})

const updateUserSchema = joi.object({
  email: email,
  password: password,
  role: role
})


const getUserSchema = joi.object({
  id: id.required()
})

module.exports = {createUserSchema, updateUserSchema, getUserSchema}
