import sql from "mssql";

// SQL Server configuration
const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  port: parseInt(process.env.DB_PORT) || 1433,
};

// Create a connection pool with a promise
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.log("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

// Normal queries to db handled here
async function executeQuery(
  query,
  values = [],
  paramNames = [],
  isStoredProcedure = true,
  outputParamName = null
) {
  try {
    const pool = await poolPromise; // Use existing pool
    const request = pool.request();

    if (values && paramNames) {
      for (let i = 0; i < values.length; i++) {
        request.input(paramNames[i], values[i]);
      }
    }

    // Handle output parameter
    if (outputParamName) {
      request.output(outputParamName, sql.Int);
    }

    // Validate values
    values.forEach((val, index) => {
      if (typeof val === "undefined") {
        console.error(`Undefined value found for ${paramNames[index]}`);
      }
    });

    let result;
    if (isStoredProcedure) {
      result = await request.execute(query);
    } else {
      result = await request.query(query); // Use query() instead of batch()
    }

    if (outputParamName) {
      result = {
        ...result,
        [outputParamName]: request.parameters[outputParamName].value,
      };
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Bulk queries handled here
async function executeTableValuedQuery(
  query,
  table,
  paramNames = [],
  isStoredProcedure = true,
  outputParamName = null
) {
  try {
    const pool = await poolPromise; // Use existing pool
    const request = pool.request();

    // Setting the table-valued parameter
    if (table instanceof sql.Table) {
      request.input(paramNames, table);
    }

    // Handle output parameter
    if (outputParamName) {
      request.output(outputParamName, sql.Int);
    }

    let result;
    if (isStoredProcedure) {
      result = await request.execute(query);
    } else {
      result = await request.query(query);
    }

    if (outputParamName) {
      result = {
        ...result,
        [outputParamName]: request.parameters[outputParamName].value,
      };
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export  { sql, poolPromise, executeQuery, executeTableValuedQuery };
