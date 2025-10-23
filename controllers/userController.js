import {
  sql,
  poolPromise,
  executeQuery,
  executeTableValuedQuery,
} from "../config/db.js";
// @desc Get all users
// @route GET /api/allAppUsers

 export const getUsers = async (req, res, next) => {
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
};

 export const defaultRoute = (req, res) => {
  res.json({msg: "User route is working properly"});
}