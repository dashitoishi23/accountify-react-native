export const currencyMasker = (amount: string) => {
  amount = amount.split(',').join('');
  amount = Math.abs(parseInt(amount)).toString(); //avoiding negative numbers
  ('------AMOUNT------', typeof amount);
  (amount, 'amount');
  const parts = amount.split('.');
  const buffer = [];

  let number = parts[0];
  while (number.length > 0) {
    buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
    number = number.substr(0, number.length - 3);
    ({buffer, number});
  }

  let formattedNumber = '';
  formattedNumber = buffer.join(',');

  if (parts.length === 1) {
    parts.push('00');
  } //no decimals entered in input
  const decimals = parts[1];
  formattedNumber += '.' + decimals;

  (formattedNumber, 'formatted');

  return formattedNumber;
};
