const { ethers } = require('ethers');
const {
  address: smartXCPAddress,
  ABI: smartXCPABI,
} = require('./contractDetails');
const { walletPrivateKey } = require('./privateKey');

class SmartXCP {
  constructor() {
    this.contract = new ethers.Contract(
      smartXCPAddress,
      smartXCPABI,
      walletPrivateKey
    );
  }
  get smartXCP() {
    return this.contract;
  }
  static async getMints(smartXCP) {
    const mints = [];
    const numMints = await smartXCP.numMints();
    for (let i = 0; i < numMints; i++) {
      const mint = await smartXCP.RXCPmints(i);
      mints.push(mint);
    }
    return mints;
  }
  static async getBurns(smartXCP) {
    const burns = [];
    const numBurns = await smartXCP.numBurns();
    for (let i = 0; i < numBurns; i++) {
      const burn = await smartXCP.RXCPburns(i);
      burns.push(burn);
    }
    return burns;
  }
}

module.exports = SmartXCP;
