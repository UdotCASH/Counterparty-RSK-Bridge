const { ethers } = require('ethers');
const SmartXCP = require('./../smartXCP/SmartXCP');
const {
  XCP_WALLET,
  createXCPSend,
  signP2SHDataTX,
  broadcastSignedTransaction,
} = require('./../xcp');
const BTC_NETWORK = process.env.BTC_NETWORK;
const XCP_SEND_FEE = parseInt(process.env.XCP_SEND_FEE);
const XCP_SEND_MEMO = process.env.XCP_SEND_MEMO;

async function processBurns(smartXCP) {
  console.log('Process Burns');
  const burns = await SmartXCP.getBurns(smartXCP);
  console.log(burns.length, ' buuuuuuuuuuuuurns');
  for (let i = 0; i < burns.length; i++) {
    const burn = burns[i];
    console.log('burn ', i);
    const { XCP_txHash: xcpTxHash } = burn;
    console.log(xcpTxHash);
    if (xcpTxHash != '') {
      console.log('confirmed send');
    } else {
      console.log('unconfirmed send');
      console.log(XCP_WALLET);
      const { amount, XCP_Address: xcpAddress } = burn;
      const formattedAmount = ethers.utils.formatUnits(amount, 10);
      const amountInt = parseInt(formattedAmount);
      console.log(amountInt, ' this is amount');
      if (amountInt != 0) {
        const rawTransaction = await createXCPSend(
          XCP_WALLET,
          xcpAddress,
          amountInt,
          XCP_SEND_MEMO,
          XCP_SEND_FEE
        );
        console.log('raw transaction');
        console.log(rawTransaction);

        const signedTransaction = await signP2SHDataTX(
          wif,
          rawTransaction,
          bitcoin.networks[BTC_NETWORK]
        );
        console.log('signed transaction');
        console.log(signedTransaction);
        const xcpTx = await broadcastSignedTransaction(signedTransaction);
        console.log(xcpTx);
        const { result: xcpTxHash } = xcpTx;
        const confirmSendTx = await smartXCP.confirmSend(i, xcpTxHash);
        const conf = await confirmSendTx.wait();
        console.log(conf);
        console.log('burn');
      }
    }
    console.log(burns[i]);
  }
}
module.exports = processBurns;
