export interface Spend {
  id: number;
  amount: number;
  category: string;
  spendTitle: string;
  date: Date;
  recurringSpend: boolean;
  timeAdded: number;
}
