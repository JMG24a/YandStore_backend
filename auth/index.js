const passport = require('passport');
const local_auth = require('./strategies/local')
const JWT_auth = require('./strategies/jwt')

passport.use(local_auth)
passport.use(JWT_auth)
