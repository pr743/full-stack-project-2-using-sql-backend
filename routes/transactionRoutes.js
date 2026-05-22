const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addTransaction, fetchTransactions, removeTransaction } = require('../controllers/transactionController');


const router = express.Router();



router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, fetchTransactions);
router.delete("/:id", authMiddleware, removeTransaction);



module.exports = router;