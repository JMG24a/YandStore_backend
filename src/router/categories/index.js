const { Router } = require('express');
const validatorHandler = require('../../middleware/validator');
const { getCategoriesSchema, createCategorySchema } = require('../../schemas/categories')
const CategoriesServices = require('../../services/categories')
const router = Router()
const services = new CategoriesServices()

router.get('/',
  async(req,res,next)=>{
    try {
      const success = await services.find()
      res.json(success)
    }catch(err){
      next(err)
    }
  }
)

router.get('/category/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async(req, res, next)=>{
    try{
      const { id } = req.params;
      const success = await services.findOne(id);
      res.json(success)
    }catch(err){
      next(err)
    }
})

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async(req,res,next)=>{
    try{
      const body = req.body
      const success = await services.create(body)
      res.json(success)
    }catch(err){
      next(err)
    }
})

router.delete('/category/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async(req,res,next)=>{
    try{
      const {id} = req.params
      const success = await services.delete(id)
      res.json(success)
    }catch(err){
      next(err)
    }
})


module.exports = router;
