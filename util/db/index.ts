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

let dbInfo: DatabaseConnectionInfo;

const initiateDBConnection = (): void => {
  if (!dbInfo.db) {
    SQLite.openDatabase(dbConfig)
      .then(database => {
        console.log('Opened connection to DB');
        dbInfo.db = database;
        dbInfo.isConnectionOpened = true;
      })
      .catch(err => {
        console.log('Error while opening DB connection: ', err);
        dbInfo.errorMessage = err;
      });
  }
};

const getDatabaseConnection = (): SQLiteDatabase | undefined => dbInfo.db;

export const dbOps = {initiateDBConnection, getDatabaseConnection};
