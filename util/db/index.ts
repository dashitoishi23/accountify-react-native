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
  console.log('Entering init db', dbInfo);
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
  return false;
};

const getDatabaseConnection = (): SQLiteDatabase | undefined => dbInfo.db;

export const dbOps = {initiateDBConnection, getDatabaseConnection};
