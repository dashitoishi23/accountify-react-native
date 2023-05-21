import {ResultSet} from 'react-native-sqlite-storage';
import {dbOps} from '.';
import {AccountifyUser} from './models/accountifyUser';

let db = dbOps.getDatabaseConnection();

if (!db) {
  dbOps
    .initiateDBConnection()
    .then(() => (db = dbOps.getDatabaseConnection()))
    .catch(err => console.log(err));
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
           wantsAllocation = ${updatedUser.wantsAllocation}, savingsAllocation = ${updatedUser.savingsAllocation}, defaultCurrenct = '${updatedUser.defaultCurrency}'`,
    [],
  );
};

export {getUser, addUser, updateUser};
