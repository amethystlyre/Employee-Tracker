const mysql = require('mysql2');
var empDb;

function connectDatabase() {
    if (!empDb) {
        // Connect to database
        empDb = mysql.createConnection(
            {
                host: 'localhost',
                // MySQL username,
                user: 'root',
                // TODO: Add MySQL password
                password: '123456',
                database: 'employment_db'
            },
            //console.log(`Connected to the employment_db database.`)
        );
    }
    return empDb;
}

module.exports = connectDatabase();  