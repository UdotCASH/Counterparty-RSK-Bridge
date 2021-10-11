const { ethers } = require('ethers');

const JsonRpcProviderUrl = process.env.RSK_JSON_API_PROVIDER;

const provider = new ethers.providers.JsonRpcProvider(JsonRpcProviderUrl);

module.exports = provider;
