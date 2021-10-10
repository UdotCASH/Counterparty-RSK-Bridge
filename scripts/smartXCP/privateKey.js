const { ethers } = require('ethers');
const provider = require('./provider');

const mnemonic =
  'type sustain gold vivid ship galaxy claw age receive make because adult';
const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
const walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey).connect(
  provider
);

module.exports = { walletPrivateKey };
