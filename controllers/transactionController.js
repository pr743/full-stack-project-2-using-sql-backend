const { createTransaction, getTransactions, deleteTransaction } = require("../models/transactionModel");



exports.addTransaction = (req, res) => {
    try {

        const { category_id, amount, type, note, transaction_date } = req.body;


        const userId = req.user.id;


        createTransaction(userId, category_id, amount, type, note, transaction_date, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message

                });

            }

            res.status(201).json({
                success: true,
                message: "Transaction added"

            });
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        });

    }
};




exports.fetchTransactions = (req, res) => {
    try {
        const userId = req.user.id;

        getTransactions(userId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }


            res.status(200).json({
                success: true,
                transactions: result
            });
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



exports.removeTransaction = (req, res) => {

    try {

        const { id } = req.params;


        const userId = req.user.id;

        deleteTransaction(id, userId, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Transaction not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Transaction deleted"
            });

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};