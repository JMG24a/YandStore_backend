const { Router } = require('express');
const UsersService = require('../../services/users');
const validator = require('../../middleware/validator');
const { createUserSchema, updateUserSchema ,getUserSchema } = require('../../schemas/users')
const router = Router();
const services = new UsersService()

router.get('/',
  async(req,res,next)=>{
    try{
      const users = await services.find()
      res.json(users)
    }catch(err){
      next(err)
    }
});

router.get('/user/:id',
  validator(getUserSchema,'params'),
  async(req,res,next)=>{
    try{
      const {id} = req.params;
      const user = await services.findOne(id)
      res.json(user)
    }catch(err){
      next(err)
    }
})

router.post('/',
  validator(createUserSchema, 'body'),
  async(req, res, next)=>{
    try{
      const body = req.body
      const success = await services.create(body)
      res.status(201).json({
        message: 'Create',
        success: success
      })
    }catch(err){
      next(err)
    }
})

router.patch('/user/:id',
  validator(getUserSchema,'params'),
  validator(updateUserSchema,'body'),
  async(req, res, next)=>{
    try{
      const {id} = req.params;
      const body = req.body;

      const success = await services.update(id,body);
      if(!success){
        res.status(404).send('Not fount')
      }

      res.json({
        message: 'update',
        data: success,
      })
    }catch(err){
      next(err)
    }
})

router.delete('/user/:id',
  validator(getUserSchema,'params'),
  async(req, res, next)=>{
    try{
      const {id} = req.params;
      const success = await services.delete(id)
      res.json({
        message: success,
      });
    }catch(err){
      next(err)
    }

})


module.exports = router;
