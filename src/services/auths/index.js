const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const {security_confirm} = require('../../middleware/securities')
const { createJWT } = require('../../../auth/tokens');
const { sendMail } = require('../../../mails/recovery')
const UserServices = require('../users')

const US = new UserServices()


class Auth{

  constructor(){}

  async auth(email,password) {
    const user = await models.User.findOne({
      where: {email}
    })

    if(!user){
      throw boom.conflict('User or Password incorrect1')
    }

    const isAuth = await security_confirm(password, user.password)

    if(!isAuth){
      throw boom.conflict('User or Password incorrect2')
    }

    delete user.dataValues.password
    return user;
  }

  async signToken(user){
    const payload = {
      sub: user.dataValues.id,
      role: user.dataValues.role
    }
    const jwt = createJWT(payload)
    return jwt
  }

  async recovery(body){
    try{
      const {email} = body
      const user = await models.User.findOne({
        where: {email: email}
      })
      if(!user){
        throw boom.notFound('User not fount')
      }

      const jwt = await this.signToken(user,{expiresIn: '15min'})
      const link = `http://myfrontend.com/recovery?jwt=${jwt}`
      const content = `<b>Ingresa a este link => ${link}</b>`

      user

      await US.update(user.id,{recoveryToken: jwt})

      const res = await sendMail(user.email, content)

      return res
    }catch(err){
      throw boom.internal('try again later')
    }

  }

}


module.exports = Auth
