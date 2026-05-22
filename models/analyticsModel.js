const db = require("../config/db");




exports.getTotalIncome = (userId, callback) => {

    const query = `
        SELECT
            SUM(amount) AS totalIncome

        FROM transactions

        WHERE user_id = ?
        AND type = 'income'
    `;

    db.query(query, [userId], callback);
};



exports.getTotalExpense = (userId, callback) => {

    const query = `
        SELECT
            SUM(amount) AS totalExpense

        FROM transactions

        WHERE user_id = ?
        AND type = 'expense'
    `;

    db.query(query, [userId], callback);
};



exports.getMonthlyReport = (userId, callback) => {

    const sql = `

        SELECT

            MONTH(transaction_date) AS month,

            LOWER(type) AS type,

            SUM(amount) AS total

        FROM transactions

        WHERE user_id = ?

        GROUP BY month, LOWER(type)

        ORDER BY month ASC

    `;

    db.query(sql, [userId], callback);
};