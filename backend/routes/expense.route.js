import express from 'express';

import isAuthenticated from '../middleware/auth.js';

import { addExpense, getAllExpense, markExpense, removeExpense, updateExpense } from '../controllers/expense.controller.js';

const router = express.Router();

router.route('/add').post(isAuthenticated, addExpense);
router.route('/all').get(isAuthenticated, getAllExpense);
router.route('/update/:id').put(isAuthenticated, updateExpense);
router.route('/remove/:id').post(isAuthenticated, removeExpense);
router.route('/mark/:id').put(isAuthenticated, markExpense);

export default router;