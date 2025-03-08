const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'brocksdenWebsite',
    password: 'x$7[kc?(mq74q9L5',
    database: 'brocksden',
    connectionLimit: 100
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

module.exports = connection;