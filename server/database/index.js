import mysql from 'mysql2';


export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'student',
    password: 'student', 
    database: 'school',
    waitForConnections: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

