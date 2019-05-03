import { Database, OPEN_CREATE, OPEN_READWRITE } from "sqlite3";
import { Config } from "./config";

let db = new Database(Config.db_path, OPEN_CREATE | OPEN_READWRITE, err => {
  if (err) {
    console.error(err.message);
    db.close();
  }
  console.log("Connected to Database");
});

const sql = `CREATE TABLE IF NOT EXISTS LOGS (
    MSG PRIMARY KEY,
    DATE TEXT NOT NULL,
    TYPE TEXT NOT NULL,
    SRC TEXT NOT NULL,
    DST TEXT NOT NULL,
    LOCATION TEXT NOT NULL
)`;

db.exec(sql);
export const DB = db;
