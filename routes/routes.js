const express = require('express');
const transactionRouter = express.Router();

const transactionController = require('../controllers/transacionController');

/*
 * GET
 */
transactionRouter.get('/:period', transactionController.list);

/*
 * GET
 */
transactionRouter.get('/get/:id', transactionController.show);

/*
 * POST
 */
transactionRouter.post('/', transactionController.create);

/*
 * PUT
 */
transactionRouter.put('/:id', transactionController.update);

/*
 * DELETE
 */
transactionRouter.delete('/:id', transactionController.remove);


module.exports = transactionRouter;




