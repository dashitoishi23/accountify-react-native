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
    .catch(err => err);
}

const getUser = (): Promise<[ResultSet]> | undefined => {
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

const updateSpend = (
  existingSpend: Spend,
): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    `update Spend set amount = ${existingSpend.amount}, category = '${existingSpend.category}', spendTitle = '${existingSpend.spendTitle}', 
        recurringSpend = ${existingSpend.recurringSpend}, dateAdded = ${existingSpend.dateAdded}
        where id = '${existingSpend.id}'`,
    [],
  );
};

const deleteSpend = (id: string): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(`delete from Spend where id = '${id}'`, []);
};

const getSpendByCategory = (
  category: string,
): Promise<[ResultSet]> | undefined => {
  return db?.executeSql('Select * from Spend where category = ?', [category]);
};

const getSpendById = (id: string): Promise<[ResultSet]> | undefined => {
  return db?.executeSql('Select * from Spend where id = ?', [id]);
};

const getAllSpends = (): Promise<[ResultSet]> | undefined => {
  return db?.executeSql('Select * from Spend order by dateAdded DESC');
};

const getTotalSpendsByCategory = (
  category: string,
): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    'select sum(amount) as total from Spend where category = ?',
    [category],
  );
};

const getTotalSpendsByCategoryByCurrentMonth = (
  category: string,
): Promise<[ResultSet]> | undefined => {
  const currentDate = new Date();
  const firstOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getTime();
  console.log({currentDate, firstOfMonth});
  return db?.executeSql(
    `select sum(amount) as total from Spend where category = ? and dateAdded >= ${firstOfMonth} 
    and dateAdded <= ${currentDate.getTime()}`,
    [category],
  );
};

const getTotalSpendsInCurrentMonth = (
  monthNumber: number = new Date().getMonth(),
): Promise<[ResultSet]> | undefined => {
  const currentDate = new Date();
  const firstOfMonth = new Date(
    currentDate.getFullYear(),
    monthNumber,
    1,
  ).getTime();
  return db?.executeSql(
    `select sum(amount) as total from Spend where dateAdded >= ${firstOfMonth} 
    and dateAdded <= ${currentDate.getTime()}`,
    [],
  );
};

const getFirstSpendMonth = (): Promise<[ResultSet]> | undefined => {
  return db?.executeSql(
    'select dateAdded from Spend order by dateAdded desc limit 1',
    [],
  );
};

const getAllSpendsByMonth = (
  monthNumber: number = new Date().getMonth(),
): Promise<[ResultSet]> | undefined => {
  const currentDate = new Date();
  const firstOfMonth = new Date(
    currentDate.getFullYear(),
    monthNumber,
    1,
  ).getTime();
  return db?.executeSql(
    `Select * from Spend where dateAdded >= ${firstOfMonth} and dateAdded <= ${currentDate.getTime()} order by dateAdded DESC`,
  );
};

const getHistoricalSpends = (
  config: number,
): Promise<[ResultSet]> | undefined => {
  const currentDate = new Date().getTime();
  return db?.executeSql(
    `Select * from Spend where dateAdded >= ${getFirstDate(
      config,
      currentDate,
    )} and dateAdded <= ${currentDate} order by dateAdded DESC`,
    [],
  );
};

const getHistoricalTotalSpends = (
  config: number,
): Promise<[ResultSet]> | undefined => {
  const currentDate = new Date().getTime();
  console.log({currentDate, firstDate: getFirstDate(config, currentDate)});
  return db?.executeSql(
    `Select sum(amount) as total from Spend where dateAdded >= ${getFirstDate(
      config,
      currentDate,
    )} and dateAdded <= ${currentDate} order by dateAdded DESC`,
    [],
  );
};

const getFirstDate = (config: number, currentDate: number) => {
  const monthInMs = 30 * 24 * 60 * 60 * 1000;
  switch (config) {
    case 1:
      return new Date(currentDate - monthInMs * 1).getTime();
    case 3:
      return new Date(currentDate - monthInMs * 3).getTime();
    case 6:
      return new Date(currentDate - monthInMs * 6).getTime();
    case 12:
      return new Date(currentDate - monthInMs * 12).getTime();
  }
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
  getTotalSpendsByCategoryByCurrentMonth,
  getTotalSpendsInCurrentMonth,
  getFirstSpendMonth,
  getAllSpendsByMonth,
  getHistoricalSpends,
  getHistoricalTotalSpends,
};
