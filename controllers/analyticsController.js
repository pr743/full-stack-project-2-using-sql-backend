const {
    getTotalIncome,
    getTotalExpense,
    getMonthlyReport
} = require("../models/analyticsModel");



exports.getDashboardSummary = (req, res) => {

    try {

        const userId = req.user.id;


        getTotalIncome(userId, (incomeErr, incomeResult) => {

            if (incomeErr) {
                return res.status(500).json({
                    success: false,
                    message: incomeErr.message
                });
            }


            getTotalExpense(userId, (expenseErr, expenseResult) => {

                if (expenseErr) {
                    return res.status(500).json({
                        success: false,
                        message: expenseErr.message
                    });
                }

                const totalIncome =
                    incomeResult[0].totalIncome || 0;

                const totalExpense =
                    expenseResult[0].totalExpense || 0;

                const balance =
                    totalIncome - totalExpense;

                res.status(200).json({
                    success: true,
                    summary: {
                        totalIncome,
                        totalExpense,
                        balance
                    }
                });
            });
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





exports.getMonthlyAnalytics = (req, res) => {

    try {

        const userId = req.user.id;


        console.log("User ID:", userId);
        getMonthlyReport(userId, (err, results) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message
                });
            }


            console.log(
                "MONTHLY RESULTS:",
                results
            );

            const months = [

                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"

            ];
            const formattedData = months.map((monthName) => ({

                month: monthName,

                income: 0,

                expense: 0

            }));

            results.forEach((item) => {

                const index = item.month - 1;

                if (item.type === "income") {

                    formattedData[index].income =
                        Number(item.total);

                } else {

                    formattedData[index].expense =
                        Number(item.total);
                }
            });

            res.status(200).json({

                success: true,

                reports: formattedData
            });

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};