var bitcoin = require("bitcoinjs-lib");

var key = bitcoin.ECPair.fromWIF("KySMz3MKMH454tf4jMcD38RgyNj8MfGNLzgMjMf1weDAr9u2Ak9w",bitcoin.networks.bitcoin);
let txHex = "0100000001e2e40bfeb263800b6b24120d2a42a543c96ef8084c5b7ffc889ed0474c1a50f0010000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88acffffffff020000000000000000306a2e7b987f72fe001f75a2908046bfac00c9505d4c0438b855915c6611a63bc1c339d95e7e149f2b777d948dbcbfb8e2a0210000000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000"

    const BTC_TESTNET = bitcoin.networks.bitcoin;

    var txb= bitcoin.TransactionBuilder.fromTransaction (
        bitcoin.Transaction.fromHex (txHex), BTC_TESTNET);


txb.sign(0, key);

console.log(txb.build().toHex());
