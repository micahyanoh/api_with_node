const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
  try {
    const pool = await connectDB();
    console.log(' Database connected successfully');

    // // Example route
    // app.get('/', async (req, res) => {
    //   try {
    //     const result = await pool.request().query('SELECT TOP 5 * FROM YourTable');
    //     res.json(result.recordset);
    //   } catch (err) {
    //     res.status(500).send(' Query failed: ' + err.message);
    //   }
    // });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(' Failed to connect to database:', err.message);
    process.exit(1);
  }
})();
