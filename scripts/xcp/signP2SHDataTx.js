const bitcoin = require('bitcoinjs-lib');

async function signP2SHDataTX(wif, txHex, network) {
  const key = bitcoin.ECPair.fromWIF(wif);
  const txb = bitcoin.TransactionBuilder.fromTransaction(
    bitcoin.Transaction.fromHex(txHex),
    network
  );
  txb.sign(0, key);
  const signedTxHex = txb.build().toHex();
  return signedTxHex;
}

module.exports = signP2SHDataTX;
