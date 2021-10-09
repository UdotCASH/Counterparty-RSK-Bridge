//import ether and bitcoin libraries
const bitcoin = require('bitcoinjs-lib');
const SmartXCP = require('./smartXCP/SmartXCP');
const {
  getSends,
  getXCPBalance,
  getXCPBurns,
  signP2SHDataTX,
  createXCPSend,
  broadcastSignedTransaction,
} = require('./xcp');

//const Rsk3 = require('@rsksmart/rsk3')
//rsk3 = new Rsk3("https://public-node.rsk.co",null)

const BTC_MAINNET = bitcoin.networks.bitcoin;

//console.log(rsk3)
//0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8

const smartXCP = new SmartXCP().smartXCP;

// getBalance();
// sendtest();
async function sendtest() {
  // let rawTransaction = await createXCPSend("18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP", "1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7", 1, "1234");
  let rawTransaction = await createXCPSend(
    '18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP',
    '12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7',
    1,
    'memolobo'
  );
  console.log('Raw tx ', rawTransaction);
  const signedTxHex = await signP2SHDataTX(
    'KySMz3MKMH454tf4jMcD38RgyNj8MfGNLzgMjMf1weDAr9u2Ak9w',
    rawTransaction,
    BTC_MAINNET
  );
  console.log(signedTxHex);
  // console.log(rawTransaction)
  let broadcast = await broadcastSignedTransaction(signedTxHex);
  // let broadcast = await broadcastSignedTransaction('0100000001e2e40bfeb263800b6b24120d2a42a543c96ef8084c5b7ffc889ed0474c1a50f0010000006b483045022100c9790b2e168d52b56870cf4671eefd78dd51033eeea82a500ef75c5455a41d3d0220526681462d01d969d5cdb84be104b97b82f006d484afaf3a6b3e639590e34856012103044680f1bdc06881a699981e82b24096f4f22bea51b13a5e781441e99cc4f96bffffffff020000000000000000306a2e7b987f72fe001f75a2908046bfac00c9505d4c0438b855915c6611a63bc1c339d95e7e149f2b777d948dbcbfb8e2a0210000000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000');
  console.log(broadcast);
}
async function getBalance() {
  const balance = await smartXCP.balanceOf(
    '0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8'
  );
  console.log(balance);
  // console.log('minting');
  // await mint('ff', 'ff', 10, '0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8');
  // console.log('burning');
  // await burn('b', 1);

  const mints = await SmartXCP.getMints(smartXCP);
  console.log('mints', mints);
  const burns = await SmartXCP.getBurns(smartXCP);
  console.log('burns', burns);
  const sends = await getSends('1BS2eDhEZ3TwcwTBDNPSrKtskTd4Cyy9oN');
  console.log('Sends');
  console.log(sends);
  const xcpBurns = await getXCPBurns('1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7');
  console.log('Burns');
  console.log(xcpBurns);
  const xcpBalance = await getXCPBalance('1GRJD3KrSiDHvcUYyfWFmgcNci8CHo1LoJ');
  console.log('XCP Balance');
  console.log(xcpBalance);
  const unsignedHex = await createXCPSend(
    '1BS2eDhEZ3TwcwTBDNPSrKtskTd4Cyy9oN',
    '1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7',
    1,
    '1234'
  );
  console.log('unsigned hex');
  console.log(unsignedHex);
}
//TODO
//send away excess XCP

//set up XCP wallet
