The purpose of this abstraction is to make it simple to
create a line of trust by providing a more straightforward
interface for users to consume. Currently one would have to
 understand the trust line system as well as how to 
deal with connecting to a remote server and also how to build
a transaction that sets trust lines for an account.

Instead my goal was to abstract the trust line interface
for the 90% use case. Here is an initial result of the effort:

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

