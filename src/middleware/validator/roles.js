const boom = require('@hapi/boom');

const validatorRoles = (roles) =>{
  return (req, res, next) =>{
    const user = req.user
    if(roles.includes(user.role)){
      next()
    }else{
      next(boom.forbidden('access restring'))
    }
  }
}

module.exports = { validatorRoles }
