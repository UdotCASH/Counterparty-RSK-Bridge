const { ethers } = require('ethers');
const provider = require('./provider');

const mnemonic = process.env.MNEMONIC;
const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
const walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey).connect(
  provider
);

module.exports = { walletPrivateKey };
