const { createCategory, getCategories, deleteCategory } = require("../models/categoryModel");




exports.addCategory = (req, res) => {
    try {
        const { name, type } = req.body;

        const userId = req.user.id;


        createCategory(userId, name, type, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            res.status(201).json({
                success: true,
                message: "Category created"


            });

        }
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.fetchCategories = (req, res) => {
    try {
        const userId = req.user.id;

        getCategories(userId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                categories: results
            });
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



exports.removeCategory = (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        deleteCategory(id, userId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Category deleted"

            });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}