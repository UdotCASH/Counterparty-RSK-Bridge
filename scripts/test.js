//import ether and bitcoin libraries
require('dotenv').config();
const bitcoin = require('bitcoinjs-lib');
const {
  getSends,
  getXCPBalance,
  getXCPBurns,
  signP2SHDataTX,
  createXCPSend,
  broadcastSignedTransaction,
} = require('./xcp');
const { processSends, processBurns } = require('./bot');
const SmartXCP = require('./smartXCP/SmartXCP');
const smartXCP = new SmartXCP().smartXCP;

//0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8

// const wif = 'KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57';
const wif = 'KySMz3MKMH454tf4jMcD38RgyNj8MfGNLzgMjMf1weDAr9u2Ak9w';

async function sendTest() {
  let rawTransaction = await createXCPSend(
    '18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP',
    '12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7',
    1,
    '1234'
  );
  console.log('Raw tx ', rawTransaction);
  const signedTxHex = await signP2SHDataTX(
    wif,
    rawTransaction,
    bitcoin.networks.bitcoin
  );
  console.log('Signed tx ', signedTxHex);
  let broadcast = await broadcastSignedTransaction(signedTxHex);
  console.log(broadcast);
}

async function getBalance() {
  console.log('Getting Balance');
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

getBalance();
sendTest();

processSends(smartXCP);
processBurns(smartXCP);
