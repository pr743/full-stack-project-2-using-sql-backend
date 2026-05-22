const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getDashboardSummary, getMonthlyAnalytics } = require('../controllers/analyticsController');



const router = express.Router();



router.get("/summary", authMiddleware, getDashboardSummary);
router.get(
    "/monthly-report",
    authMiddleware,
    getMonthlyAnalytics
);



module.exports = router;