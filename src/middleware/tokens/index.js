const boom = require('@hapi/boom')

const validatorToken = async(req,res,next) =>{
  const token = req.headers['token-home']
  if(token === 'AS'){
    next();
  }else{
    next(boom.unauthorized('You dont have access'))
  }
}

module.exports = {validatorToken}


