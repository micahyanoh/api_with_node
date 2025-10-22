const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// SQL Server configuration
const config = {
    //user: process.env.USERNAME, // Replace with your SQL Server username
   // password: process.env.PASSWORD, // Replace with your SQL Server password
    server: process.env.DB_SERVER, // Replace with your server name and instance (e.g., 'localhost\\SQLEXPRESS')
    database: process.env.DB_NAME, // Replace with your database name
    options: {
        encrypt: false, // For local connections, set to true for Azure SQL Database
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    },

    authentication: {
    type: 'ntlm',
    options: {
      domain: process.env.DOMAIN || '', // leave empty if not on a domain
      userName: process.env.USER || '', // or leave blank to use your Windows login
      password: process.env.PASSWORD || ''
    }}
    
};
const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log(' Connected to SQL Server using Windows Authentication');
  } catch (err) {
    console.error(' Connection failed:', err.message);
  }
};

module.exports = { connectDB, sql };

