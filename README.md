var TrustLine = require('./trust_line.js');

var trustLine = new TrustLine({
  account: 'rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB'
  counterparty: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
  currency: 'XAG',
  amount: 10,
  noRipple: false,
});

trustLine.sign(process.env.RIPPLE_SECRET_KEY).submit({
  success: console.log,
  error: console.log
});

