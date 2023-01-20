import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbConfig: SQLite.DatabaseParams = {
  name: 'accountify',
};

interface DatabaseConnectionInfo {
  db: SQLiteDatabase;
  isConnectionOpened: boolean;
}

let db: SQLiteDatabase;
let isConnectionOpened: boolean = false;

const initiateDBConnection = (): DatabaseConnectionInfo => {
  db = SQLite.openDatabase(
    dbConfig,
    () => {
      console.log('Opened connection to DB');
      isConnectionOpened = true;
    },
    (e: SQLite.SQLError) => {
      console.log('Error in creating DB: ', e.message);
      isConnectionOpened = false;
    },
  );

  return {
    db: db,
    isConnectionOpened: isConnectionOpened,
  };
};
