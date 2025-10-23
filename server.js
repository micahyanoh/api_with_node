const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./routes/user.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/api", userRoutes.router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});