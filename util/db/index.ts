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

const initiateDBConnection = async (): Promise<boolean> => {
  ('Entering init db', dbInfo);
  SQLite.enablePromise(true);
  if (!dbInfo || !(dbInfo as DatabaseConnectionInfo).isConnectionOpened) {
    try {
      let database = await SQLite.openDatabase(dbConfig);
      dbInfo.db = database;
      dbInfo.isConnectionOpened = true;
      return true;
    } catch (err: any) {
      dbInfo.isConnectionOpened = false;
      dbInfo.errorMessage = err.toString();
      return false;
    }
  }
  return true;
};

const getDatabaseConnection = (): SQLiteDatabase => dbInfo.db as SQLiteDatabase;

export const dbOps = {initiateDBConnection, getDatabaseConnection};
