import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import  userRoutes from "./routes/user.js";
import errorHandler from "./middleware/error.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

//routes
app.use("/api", userRoutes);

//handle 404 errors for undefined routes
app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

//error handling middleware
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});