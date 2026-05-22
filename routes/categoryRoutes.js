const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addCategory, fetchCategories, removeCategory } = require('../controllers/categoryController');


const router = express.Router();



router.post("/", authMiddleware, addCategory);
router.get("/", authMiddleware, fetchCategories);
router.delete("/:id", authMiddleware, removeCategory);



module.exports = router;