const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: '',
    user: '',
    port: '',
    password: '',
    database: '',
};

// Create a MySQL pool
const connection = mysql.createPool(config);

// Export the pool
module.exports = connection;