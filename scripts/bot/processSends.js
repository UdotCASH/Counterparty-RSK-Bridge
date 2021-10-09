const { ethers } = require('ethers');
const { walletPrivateKey } = require('./../smartXCP/privateKey');

async function processSends(smartXCP, XCP_Address) {
  const { result: sends } = await getSends(XCP_Address);

  //console.log(sends)
  for (send of sends) {
    let isminted = await smartXCP.is_XCP_deposit_minted(send.tx_hash);
    amount = ethers.utils.parseUnits(send.quantity.toString(), 10);
    console.log(ethers.utils.formatUnits(amount, 0));
    if (!isminted) {
      let destinationAddress;
      try {
        destinationAddress = await ethers.utils.getAddress(send.memo_hex);
      } catch {
        destinationAddress = walletPrivateKey.address;
      }
      console.log(destinationAddress);
      amount = ethers.utils.parseUnits(send.quantity.toString(), 10);
      console.log(amount);
      try {
        let tx = await smartXCP.mint(
          send.tx_hash,
          send.source,
          amount,
          destinationAddress
        );
        let conf = await tx.wait();
        console.log(conf);
      } catch {
        console.log('Already minted');
      }
    }
  }
}
