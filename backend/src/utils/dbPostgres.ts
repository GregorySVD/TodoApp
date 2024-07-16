import { Pool } from "pg";
import { DBENV } from "../../dbConfig";

export const poolPostgres = new Pool({
  connectionString: DBENV.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

poolPostgres.on("connect", () => {
  console.log("Connected to the database");
});

poolPostgres.on("error", err => {
  console.error("An error occurred with the database connection:", err);
});
