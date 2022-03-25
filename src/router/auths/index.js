const { Router } = require('express');
const passport = require('passport');
const AuthService = require('../../services/auths')

const router = Router();
const services = new AuthService()

router.post('/login',
  passport.authenticate('local', {session: false}),
  async(req,res,next)=>{
    try{
      const user = req.user;
      const success = await services.signToken(user)
      res.json({
        user: user,
        token: success
      })
    }catch(err){
      next(err)
    }
})

router.post('/recovery',
  async(req,res,next)=>{
    try{
      const body = req.body;
      const success = await services.recovery(body)
      res.json(success)
    }catch(err){
      next(err)
    }
})

router.post('/recovery/password',
  async(req,res,next)=>{
    try{
      const {token, password} = req.body;
      const success = await services.changePassword(token,password)
      res.json(success)
    }catch(err){
      next(err)
    }
})

module.exports = router
