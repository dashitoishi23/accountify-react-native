import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbConfig: SQLite.DatabaseParams = {
  name: 'accountify',
};

interface DatabaseConnectionInfo {
  db?: SQLiteDatabase;
  isConnectionOpened: boolean;
  errorMessage?: string;
}

let db: SQLiteDatabase;
let isConnectionOpened: boolean = false;
let errorMessage: string;

const initiateDBConnection = (): DatabaseConnectionInfo => {

  SQLite.openDatabase(dbConfig)
  .then(database => {
    console.log("Opened connection to DB");
    db = database
    isConnectionOpened = true
  })
  .catch(err => {
    console.log("Error while opening DB connection: ", err)
    errorMessage = err
  })

  return {
    db: db,
    isConnectionOpened: isConnectionOpened,
    errorMessage: errorMessage
  };
};

export default initiateDBConnection
