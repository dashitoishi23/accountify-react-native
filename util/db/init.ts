import {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';

export const initDatabase = (db: SQLiteDatabase): Promise<Transaction> => {
  return (db as SQLiteDatabase).transaction((tx: Transaction) => {
    tx.executeSql(
      'create table if not exists AccountifyUser (monthlyIncome float, needsAllocation float, wantsAllocation float,\
                  savingsAllocation float, defaultCurrency varchar(3), startDate int default 1)',
      [],
    );

    tx.executeSql(
      'create table if not exists Spend(id string, amount float, category varchar(10), spendTitle vaerchar(225), \
              recurringSpend bit, dateAdded int)',
      [],
    );
  });
};

export const getAccountifyUser = async (db: SQLiteDatabase) => {
  const results = await db.executeSql('Select * from AccountifyUser');

  return results[0].rows;
};
