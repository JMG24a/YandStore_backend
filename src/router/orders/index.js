const { Router } = require('express')
const passport = require('passport')
const validatorHandler = require('../../middleware/validator');
const {getOrderSchema, createOrderSchema, addItemsOrderSchema} = require('../../schemas/orders')
const OrderServices = require('../../services/orders')
const services = new OrderServices()
const router = Router();

router.get('/order/:id',
  validatorHandler(getOrderSchema,'params'),
  async(req,res,next)=>{
    try{
      const {id} = req.params;
      const success = await services.findOne(id)
      res.json(success)
    }catch(err){
      next(err)
    }
  }
)

router.get('/user',
  passport.authenticate('jwt', {session: false}),
  async(req,res,next)=>{
    try{
      const {sub} = req.user;
      const success = await services.findByCustomer(sub)
      res.json(success)
    }catch(err){
      next(err)
    }
  }
)

router.post('/',
  validatorHandler(createOrderSchema,'body'),
  async(req,res,next)=>{
    try{
      const body = req.body;
      const success = await services.create(body)
      res.json(success)
    }catch(err){
      next(err)
    }
  }
)

router.post('/add-item',
  validatorHandler(addItemsOrderSchema,'body'),
  async(req,res,next)=>{
    try{
      const body = req.body;
      const success = await services.addItem(body);
      res.json(success);
    }catch(err){
      next(err)
    }
  }
)


module.exports = router;
