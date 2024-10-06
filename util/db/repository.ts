import {ResultSet} from 'react-native-sqlite-storage';
import {dbOps} from '.';
import {AccountifyUser} from './models/accountifyUser';
import {Spend} from './models/spend';

let db = dbOps.getDatabaseConnection();

if (!db) {
  dbOps
    .initiateDBConnection()
    .then(() => {
      db = dbOps.getDatabaseConnection();
    })
    .catch(err => (err));
}

const getUser = (): Promise<[ResultSet]> | undefined => {
  console.log({ db })
  return db?.executeSql('select * from AccountifyUser', []);
};

const addUser = (newUser: AccountifyUser): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    `insert into AccountifyUser values (${newUser.monthlyIncome}, ${newUser.needsAllocation}, 
            ${newUser.wantsAllocation}, ${newUser.savingsAllocation}, '${newUser.defaultCurrency}')`,
    [],
  );
};

const updateUser = (
  updatedUser: AccountifyUser,
): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    `update AccountifyUser set monthlyIncome = ${updatedUser.monthlyIncome}, needsAllocation = ${updatedUser.needsAllocation}, 
           wantsAllocation = ${updatedUser.wantsAllocation}, savingsAllocation = ${updatedUser.savingsAllocation}, defaultCurrency = '${updatedUser.defaultCurrency}'`,
    [],
  );
};

const addSpend = (newSpend: Spend): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    `insert into Spend values ('${newSpend.id}', ${newSpend.amount}, '${newSpend.category}', '${newSpend.spendTitle}', 
        ${newSpend.recurringSpend}, ${newSpend.dateAdded})`,
    [],
  );
};

const updateSpend = (existingSpend: Spend): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    `update Spend set amount = ${existingSpend.amount}, category = '${existingSpend.category}', spendTitle = '${existingSpend.spendTitle}', 
        recurringSpend = ${existingSpend.recurringSpend}, dateAdded = ${existingSpend.dateAdded}
        where id = '${existingSpend.id}'`,
    [],
  );
}

const deleteSpend = (id: string): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    `delete from Spend where id = '${id}'`, []
  )
}

const getSpendByCategory = (
  category: string,
): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(`Select * from Spend where category = ?`, [category]);
};

const getSpendById = (id: string): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(`Select * from Spend where id = ?`, [id]);
};

const getAllSpends = (): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(`Select * from Spend order by dateAdded DESC`);
};

const getTotalSpendsByCategory = (
  category: string,
): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    `select sum(amount) as total from Spend where category = ?`,
    [category],
  );
};

export {
  getUser,
  addUser,
  updateUser,
  addSpend,
  updateSpend,
  deleteSpend,
  getSpendByCategory,
  getSpendById,
  getAllSpends,
  getTotalSpendsByCategory,
};
