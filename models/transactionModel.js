const db = require("../config/db");

exports.createTransaction = (
    userId,
    categoryId,
    amount,
    type,
    note,
    transactionDate,
    callback
) => {

    const query = `
        INSERT INTO transactions
        (
            user_id,
            category_id,
            amount,
            type,
            note,
            transaction_date
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            userId,
            categoryId,
            amount,
            type,
            note,
            transactionDate
        ],
        callback
    );
};

exports.getTransactions = (userId, callback) => {

    const query = `
        SELECT
            transactions.id,
            transactions.amount,
            transactions.type,
            transactions.note,
            transactions.transaction_date,
            categories.name AS category_name

        FROM transactions

        INNER JOIN categories
        ON transactions.category_id = categories.id

        WHERE transactions.user_id = ?

        ORDER BY transactions.transaction_date DESC
    `;

    db.query(query, [userId], callback);
};

exports.deleteTransaction = (
    id,
    userId,
    callback
) => {

    const query = `
        DELETE FROM transactions
        WHERE id = ? AND user_id = ?
    `;

    db.query(query, [id, userId], callback);
};