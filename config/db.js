const sql = require('mssql');

// SQL Server configuration
const config = {
    //user: process.env.USERNAME, // Replace with your SQL Server username
   // password: process.env.PASSWORD, // Replace with your SQL Server password
    server: process.env.DB_SERVER, // Replace with your server name and instance (e.g., 'localhost\\SQLEXPRESS')
    database: process.env.DB_NAME, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    options: {
        encrypt: false, // For local connections, set to true for Azure SQL Database
        enableArithAbort: true,
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    },
    port:parseInt(process.env.DB_PORT) || 1433,
    // authentication: {
    // type: 'ntlm',
    // options: {
    //   domain: process.env.DOMAIN || '', // leave empty if not on a domain
    //   userName: process.env.USER || '', // or leave blank to use your Windows login
    //   password: process.env.PASSWORD || ''
    // }}
    
};

// create a connection pool with a promise
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => { 
        console.log('Connected to SQL Server');
        return pool; 
    })
    .catch(err => {
      console.log('Database Connection Failed! Bad Config: ', err);
      throw err;
    } );


module.exports = {
    sql, 
   poolPromise
};