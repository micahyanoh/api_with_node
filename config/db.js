const sql = require('mssql');

// SQL Server configuration
const config = {
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    options: {
        encrypt: false, // set to true for Azure 
        enableArithAbort: true,
        trustServerCertificate: true // true for local dev 
    },
    port:parseInt(process.env.DB_PORT) || 1433,
    
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