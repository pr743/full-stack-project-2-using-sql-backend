const db = require("../config/db");




exports.findUserByEmail = (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], callback);

};


exports.createUser = (name, email, password, callback) => {
    const query = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

    db.query(query, [name, email, password], callback);
};