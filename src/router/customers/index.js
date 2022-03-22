const express = require('express');

const CustomerService = require('../../services/customers');
const validator = require('../../middleware/validator');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../../schemas/customers');

const router = express.Router();
const service = new CustomerService();

router.get('/',  async (req, res, next) => {
  try {
    const success = await service.find()
    res.json(success);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validator(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/customer/:id',
  validator(getCustomerSchema, 'params'),
  validator(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/customer/:id',
  validator(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
