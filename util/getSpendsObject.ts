import {
  getTotalSpendsByCategory,
} from './db/repository';
import 'react-native-get-random-values';
import {AccountifyUser} from './db/models/accountifyUser';

export const getSpendsObject = async (accountifyUser: AccountifyUser) => {
  const needsSpends = await getTotalSpendsByCategory('needs');
  const wantsSpends = await getTotalSpendsByCategory('wants');
  const savingsSpends = await getTotalSpendsByCategory('savings');

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
      percentage: ((needsAllocation - needsTotal) / needsAllocation) * 100,
    },
    wants: {
      remaining: wantsAllocation - wantsTotal || 0,
      percentage: ((wantsAllocation - wantsTotal) / wantsAllocation) * 100,
    },
    savings: {
      remaining: savingsAllocation - savingsTotal || 0,
      percentage:
        ((savingsAllocation - savingsTotal) / savingsAllocation) * 100,
    },
  };
  return spendsObject;
};
