import {getTotalSpendsByCategoryByCurrentMonth} from './db/repository';
import 'react-native-get-random-values';
import {AccountifyUser} from './db/models/accountifyUser';

export const getSpendsObject = async (accountifyUser: AccountifyUser) => {
  const needsSpends = await getTotalSpendsByCategoryByCurrentMonth(
    'needs',
    accountifyUser,
  );
  const wantsSpends = await getTotalSpendsByCategoryByCurrentMonth(
    'wants',
    accountifyUser,
  );
  const savingsSpends = await getTotalSpendsByCategoryByCurrentMonth(
    'savings',
    accountifyUser,
  );

  const needsTotal = !needsSpends ? 0 : needsSpends?.[0].rows.raw()[0]['total'];
  const wantsTotal = !wantsSpends ? 0 : wantsSpends?.[0].rows.raw()[0]['total'];
  const savingsTotal = !savingsSpends
    ? 0
    : savingsSpends?.[0].rows.raw()[0]['total'];

  const needsAllocation =
    accountifyUser.needsAllocation * 0.01 * accountifyUser.monthlyIncome;

  const savingsAllocation =
    accountifyUser.savingsAllocation * 0.01 * accountifyUser.monthlyIncome;

  const wantsAllocation =
    accountifyUser.wantsAllocation * 0.01 * accountifyUser.monthlyIncome;

  const spendsObject = {
    needs: {
      remaining: needsAllocation - needsTotal || 0,
      total: needsAllocation,
    },
    wants: {
      remaining: wantsAllocation - wantsTotal || 0,
      total: wantsAllocation,
    },
    savings: {
      remaining: savingsAllocation - savingsTotal || 0,
      total: savingsAllocation,
    },
  };
  return spendsObject;
};
