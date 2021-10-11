const { ethers } = require('ethers');
const { walletPrivateKey } = require('./../smartXCP/privateKey');
const { XCP_WALLET, getSends } = require('./../xcp');

async function processSends(smartXCP) {
  console.log('Process Sends');
  const { result: sends } = await getSends(XCP_WALLET);
  console.log(sends);
  for (send of sends) {
    console.log('send', send);
    const { tx_hash: txHash, source, quantity, memo_hex: memoHex } = send;
    const isMinted = await smartXCP.is_XCP_deposit_minted(txHash);
    console.log('isMinted', isMinted);
    const amount = ethers.utils.parseUnits(quantity.toString(), 10);
    console.log(ethers.utils.formatUnits(amount, 0));
    if (!isMinted) {
      let destinationAddress;
      try {
        destinationAddress = await ethers.utils.getAddress(memoHex);
      } catch {
        destinationAddress = walletPrivateKey.address;
      }
      console.log('destinationAddress', destinationAddress);
      try {
        const tx = await smartXCP.mint(
          txHash,
          source,
          amount,
          destinationAddress
        );
        const conf = await tx.wait();
        console.log(conf);
      } catch {
        console.log('Already minted');
      }
    }
  }
}

module.exports = processSends;
