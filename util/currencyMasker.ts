const currencyMasker = (amount: string) => {
  amount = Math.abs(parseInt(amount)).toString(); //avoiding negative numbers
  console.log('------AMOUNT------', typeof amount);
  amount = amount.split(',').join('');
  console.log(amount, 'amount');
  const parts = amount.split('.');
  const buffer = [];

  let number = parts[0];
  while (number.length > 0) {
    buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
    number = number.substr(0, number.length - 3);
  }

  let formattedNumber = '';
  formattedNumber = buffer.join(',');

  if (parts.length === 1) {
    parts.push('00');
  } //no decimals entered in input
  const decimals = parts[1];
  formattedNumber += '.' + decimals;

  console.log(formattedNumber, 'formatted');

  return formattedNumber;
};

export default currencyMasker;
