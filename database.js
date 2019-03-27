const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'Mrbean@201191',
    database: 'studentAdmin',
};

// Create a MySQL pool
const connection = mysql.createPool(config);

// Export the pool
module.exports = connection;