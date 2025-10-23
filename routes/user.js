import express from "express";
const router = express.Router();
import {
  sql,
  poolPromise,
  executeQuery,
  executeTableValuedQuery,
} from "../config/db.js";

router.get("/allAppUsers", async (req, res, next) => {
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

export default router;
