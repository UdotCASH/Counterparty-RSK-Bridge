const getSends = require('./getSends');
const getXCPBalance = require('./getXCPBalance');
const getXCPBurns = require('./getXCPBurns');
const signP2SHDataTX = require('./signP2SHDataTx');
const createXCPSend = require('./createXCPSend');
const broadcastSignedTransaction = require('./broadcastSignedTransaction');
const { XCP_WALLET } = require('./apiDetails');

module.exports = {
  getSends,
  getXCPBalance,
  getXCPBurns,
  signP2SHDataTX,
  createXCPSend,
  broadcastSignedTransaction,
  XCP_WALLET,
};
