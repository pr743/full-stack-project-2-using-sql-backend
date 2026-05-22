const db = require("../config/db");



exports.createCategory = (userId, name, type, callback) => {

    const query =
        "INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)";

    db.query(query, [userId, name, type], callback);
};



exports.getCategories = (userId, callback) => {

    const query =
        "SELECT * FROM categories WHERE user_id = ?";

    db.query(query, [userId], callback);
};



exports.deleteCategory = (id, userId, callback) => {

    const query =
        "DELETE FROM categories WHERE id = ? AND user_id = ?";

    db.query(query, [id, userId], callback);
};