import {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';
import {dbOps} from '.';

export const initDatabase = (): Promise<Transaction> => {
  let db = dbOps.getDatabaseConnection();

  console.log('DB', db);

  if (!db) {
    dbOps
      .initiateDBConnection()
      .then(() => (db = dbOps.getDatabaseConnection()))
      .catch(err => console.log(err));
  }

  return (db as SQLiteDatabase).transaction((tx: Transaction) => {
    tx.executeSql(
      'create table if not exists AccountifyUser (monthlyIncome float, needsAllocation float, wantsAllocation float,\
                savingsAllocation float, defaultCurrency varchar(3))',
      [],
      (_, rs) => {
        console.log('Created AccountifyUser', rs);
      },
    );

    tx.executeSql(
      'create table if not exists Spend(id int auto increment, amount float, category varchar(10), spendTitle vaerchar(225), date datetime, \
            recurringSpend bit, dateAdded int)',
      [],
      (_, rs) => {
        console.log('Created Spend', rs);
      },
    );
  });
};
