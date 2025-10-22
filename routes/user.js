const express = require("express");
const router = express.Router();
const {sql, 
   poolPromise,
    executeQuery,
  executeTableValuedQuery } = require('../config/db');

router.get("/allAppUsers", async (req, res) => {
  const query = "SELECT * FROM tb_app_user";
  const values = [];
  const paramNames = [];
  const isStoredProcedure = false;
  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


module.exports = {router };