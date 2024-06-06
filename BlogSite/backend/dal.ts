import mysql, { ResultSetHeader } from "mysql2/promise";
import { appConfig } from "./config/appconfig";

const connection = mysql.createConnection({
   host: appConfig.dbHost,
   user: appConfig.dbUser,
   password: appConfig.dbPassword,
   database: appConfig.dbName,
   waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function executeQuery(query:string, values:any = []):Promise<any[]>{
  try{
    const [results, fields] = await (await connection).execute(query, values);
    return results as any[];
  }
  catch(err){
    console.error('Error executing query: ', (err as Error).message);
    throw (err as Error);
  }
}

export default {
  executeQuery
};