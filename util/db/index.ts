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

let dbInfo: DatabaseConnectionInfo = {
  isConnectionOpened: false,
};

const initiateDBConnection = (): void => {
  if (!dbInfo || !(dbInfo as DatabaseConnectionInfo).isConnectionOpened) {
    SQLite.openDatabase(dbConfig)
      .then(database => {
        console.log('Opened connection to DB');
        dbInfo.db = database;
        dbInfo.isConnectionOpened = true;
      })
      .catch(err => {
        console.log('Error while opening DB connection: ', err);
        dbInfo.isConnectionOpened = false;
        dbInfo.errorMessage = err;
      });
  }
};

const getDatabaseConnection = (): SQLiteDatabase | undefined => dbInfo.db;

export const dbOps = {initiateDBConnection, getDatabaseConnection};
