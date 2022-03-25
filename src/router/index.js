const {Router} = require('express')
const usersRouter = require('./users');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const customersRouter = require('./customers');
const ordersRouter = require('./orders');
const authRouter = require('./auths');


const appRouter = (app) =>{
  const router = Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter)


  //gestionar rutas para diferentes dispositivos o modificaciones
  //const router2 = Router();
  //app.use('/api/v2', router2);
  //router2.use('/users', usersRouter);
  //router2.use('/products', productsRouter);
  //router2.use('/categories', categoriesRouter);
}

module.exports = appRouter;
