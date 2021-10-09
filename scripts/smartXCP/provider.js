const { ethers } = require('ethers');

const JsonRpcProviderUrl = 'https://public-node.testnet.rsk.co';

const provider = new ethers.providers.JsonRpcProvider(JsonRpcProviderUrl);

module.exports = provider;
