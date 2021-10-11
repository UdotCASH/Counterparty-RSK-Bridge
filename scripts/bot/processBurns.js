const SmartXCP = require('./../smartXCP/SmartXCP');

async function processBurns(){
	let burns = await getBurns()
	for(let i=0; i<burns.length;i++){
    console.log("burn ",i)
		let xcp_txHash = burns[i].XCP_txHash
		console.log(xcp_txHash)
		if(xcp_txHash!=''){
      console.log("confirmed send")
		} else {
      console.log("unconfirmed send")
      console.log(XCPWallet)

      let amount = burns[i].amount
      amount = ethers.utils.formatUnits(amount,10)
      amount = parseInt(amount)

      let rawTransaction = await createXCPSend(XCPWallet, burns[i].XCP_Address, amount, "a",2500);
      console.log("raw transaction")
      console.log(rawTransaction)

      let signedTransaction = await signp2pkhDataTX(
    		wif,
    		rawTransaction,
    		bitcoin.networks.bitcoin
    	)
      console.log("signed transaction")
      console.log(signedTransaction)
      let xcp_tx = await broadcastSignedTransaction(signedTransaction)
      console.log(xcp_tx)
      let xcp_txHash = xcp_tx.result
      let confirmsend_tx = await smartXCP.confirmSend(i,xcp_txHash)
      let conf = await confirmsend_tx.wait()
      console.log(conf)
      console.log("burn")
		  console.log(burns[i])
		}
		console.log(burns[i])
  }
}
module.exports = processBurns;
