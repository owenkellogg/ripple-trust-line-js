var ripple = require('ripple-lib');

function TrustLine(opts) {
  this.account = opts.account;
  this.counterparty = opts.counterparty; 
	this.currency = opts.currency;
	this.amount = opts.amount;
  this._remote = TrustLine.buildRemote();
  if (opts.allowRippling == null) {
		this.allowRippling = true;
	}
}

TrustLine.setRemote = function(remote) {
  this._remote = remote;
}

TrustLine.prototype.setRemote = function(remote) {
  this._remote = remote;
}

TrustLine.buildRemote = function() {
	var remote = ripple.Remote.from_config({
		"trusted" : false,
		"websocket_ip" : "s1.ripple.com",
		"websocket_port" : 443,
		"websocket_ssl" : true,
		"local_signing" : true
	});

  return remote;
}

TrustLine.prototype.sign = function(secretKey) {
  this._remote.set_secret(this.account, secretKey);
  return this;
}

TrustLine.getAccountTrustLines = function(account) {
	var remote = this._remote;
  this._remote.connect(function() {
    remote.request_account_lines(account)
		.on('success', function(lines){
			console.log(lines);
		})
		.on('error', function(err){
			console.log(err);
		})
		.request();
  });  
}

TrustLine.prototype.submit = function(callbacks) {
	var remote = this._remote;
	var trustLine = this;

	console.log(remote._secret);

	function submitTrust() {
		console.log('remote connected?', remote._connected);
		var transaction = remote.transaction();
	  remote
		var amount = {
			currency: trustLine.currency,
			value: trustLine.amount,
			issuer: trustLine.counterparty
		}

		var amt = amount.value+"/"+amount.currency+"/"+trustLine.counterparty;

		console.log(amount);
		transaction.ripple_line_set(trustLine.account, amt, 1, 1)
		//.setFlags(this.allowRippling ? 'ClearNoRipple' : 'NoRipple')
		.on('success', callbacks.success)
		.on('error', callbacks.error)
		.submit();
		remote.set_secret(null, null);
  }
  if (remote._connected) {
    submitTrust();
  } else {
		remote.connect(function(){
			submitTrust();
		});
  }
}

module.exports = TrustLine;
