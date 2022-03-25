const { Strategy } = require('passport-local');
const UserServices = require('../../../src/services/auths');

const authServices = new UserServices()

const local_auth = new Strategy(
  {usernameField:'email', passwordField: 'password'},
  async(username, password, done)=>{
    try{
      const user = await authServices.auth(username,password)
      done(null,user)
    }catch(err){
      done(err,false)
    }
})

module.exports = local_auth
