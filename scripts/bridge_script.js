//import ether and bitcoin libraries
const ethers = require('ethers');
const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');

//const Rsk3 = require('@rsksmart/rsk3')
//rsk3 = new Rsk3("https://public-node.rsk.co",null)

const BTC_MAINNET = bitcoin.networks.bitcoin;

//console.log(rsk3)
const XCP_API_URL = "http://public.coindaddy.io:4000";
const XCP_API_USER = "rpc";
const XCP_API_PASSWORD = "1234";
const BTC_URL = "https://damp-ancient-water.btc.quiknode.pro/9b377f70086180fa6d1fc6153060f09e9dd26111/";
let smartXCPAddress = "0xa511ec4390350b6817CA9122Df8Bd8297eA532F0"
let smartXCPABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "XCP_Address",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RXCPburned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "XCP_txHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "XCP_Address",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RXCPminted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_minter",
				"type": "address"
			}
		],
		"name": "addMinter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "XCP_Address",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "burnId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_XCP_txHash",
				"type": "string"
			}
		],
		"name": "confirmSend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "XCP_txHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "XCP_Address",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_minter",
				"type": "address"
			}
		],
		"name": "removeMinter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "is_XCP_deposit_minted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "minters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numBurns",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numMints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numSends",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "RXCPburns",
		"outputs": [
			{
				"internalType": "string",
				"name": "XCP_Address",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "XCP_txHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "RXCPmints",
		"outputs": [
			{
				"internalType": "string",
				"name": "XCP_txHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "XCP_Address",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let smartXCP

let provider = new ethers.providers.JsonRpcProvider("https://public-node.rsk.co")
//0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8

let mnemonic = "type sustain gold vivid ship galaxy claw age receive make because adult"
let walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
let walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey)
walletPrivateKey = walletPrivateKey.connect(provider)

let XCPWallet = "12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7"
let wif = "KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57"

smartXCP = new ethers.Contract(smartXCPAddress,smartXCPABI,walletPrivateKey)

let mints = new Array()

//processSends(XCPWallet)
//processBurns()

run()

async function run(){
  let runNumber = 1;
  while(runNumber){
    console.log("Run Number ",runNumber)
    await processSends()
    await processBurns()
    await timeout(300)
    runNumber++
  }
}

function timeout(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

async function processSends(){
  console.log("Process Sends")
	let sends = await getSends(XCPWallet)

	//console.log(sends)
	for(send of sends){
		let isminted = await smartXCP.is_XCP_deposit_minted(send.tx_hash)
		amount = ethers.utils.parseUnits(send.quantity.toString(),10)
		console.log(ethers.utils.formatUnits(amount,0))
		if(!isminted){
			let destinationAddress
			try{
				destinationAddress = await ethers.utils.getAddress(send.memo_hex)
			} catch {
				destinationAddress = walletPrivateKey.address
			}
			console.log(destinationAddress)
			amount = ethers.utils.parseUnits(send.quantity.toString(),10)
			console.log(amount)
			try{

				let tx = await smartXCP.mint(send.tx_hash,send.source,amount,destinationAddress)
				let conf = await tx.wait()
				console.log(conf)
			} catch {
				console.log("Already minted")
			}
		}
	}
}

async function processBurns(){
  console.log("Process Burns")
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

async function sendtest(){
	let rawTransaction = await createXCPSend("18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP", "1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7", 1, "1234");
	//let rawTransaction = await createXCPSend("18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP", "12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7", 1, "memolobo");
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

async function getBalance(){
	console.log("get smart xcp balance")
  let balance = await smartXCP.balanceOf("0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8")
  console.log(balance)
  //await mint()
	console.log("get mints and burns")
  await getMints()
  await getBurns()

	console.log("get the sends")
	const sends = await getSends("1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7");
	console.log('Sends');
	console.log(sends);
	console.log("get XCP balance")
	const xcpBalance = await getXCPBalance("1GRJD3KrSiDHvcUYyfWFmgcNci8CHo1LoJ");
	console.log('XCP Balance');
	console.log(xcpBalance);
}

//mint function
async function mint(){
  await smartXCP.mint("f","f",10,"0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8")
}

async function burn(){
  await smartXCP.burn("b",1);
}

async function getMints(){
  let numMints = await smartXCP.numMints()
  for (i=0;i<numMints;i++){
    mints.push(await smartXCP.RXCPmints(i))
  }
  console.log(mints)
}

//get Smart XCP Burns
async function getBurns(){
	let burns = new Array()
  let numBurns = await smartXCP.numBurns()
  for (i=0;i<numBurns;i++){
		let burn = await smartXCP.RXCPburns(i)
    burns.push(burn)
  }
	return(burns)
}
//get XCP balance

//Check for sends
async function getSends(address) {
	const body = {
		jsonrpc: "2.0",
		id: 0,
		method: 'get_sends',
		params: {
			filters: [{
				field: "destination",
				op: "==",
				value: address,
			}],
		}
	};
	try {
		const response = await axios({
			method: 'post',
			url: XCP_API_URL,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			data: JSON.stringify(body),
			auth: {
				username: XCP_API_USER,
				password: XCP_API_PASSWORD
			}
		});
		const { data, status } = response;
		if (status !== 200) {
			throw new Error();
		}
		return data.result;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}


//TODO
//send away excess XCP


//get XCP balance
async function getXCPBalance(address) {
	const body = {
		jsonrpc: "2.0",
		id: 0,
		method: 'get_balances',
		params: {
			filters: [
				{
					field: "address",
					op: "==",
				  value: address,
				},
				{
					field: "asset",
					op: "==",
					value: "XCP"
				}
			],
			filterop: "and"
		}
	};
	try {
		const response = await axios({
			method: 'post',
			url: XCP_API_URL,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			data: JSON.stringify(body),
			auth: {
				username: XCP_API_USER,
				password: XCP_API_PASSWORD
			}
		});
		const { data, status } = response;
		if (status !== 200) {
			throw new Error();
		}	let unsignedHex;

		return data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

// Create XCP Send Transaction

async function createXCPSend(source, destination, quantity, memo, fee) {

  const body = {
    jsonrpc: '2.0',
    id: 0,
    method: 'create_send',
    params: {
      source,
      destination,
      asset: 'XCP',
      quantity,
    },
  };
  if (typeof memo === 'string') {
    body.params.memo = memo;
  }
  if (typeof fee === 'number') {
    body.params.fee = fee;
  }
  try {
    const response = await axios({
      method: 'post',
      url: XCP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: JSON.stringify(body),
      auth: {
        username: XCP_API_USER,
        password: XCP_API_PASSWORD,
      },
    });
    const { data, status } = response;

    if (status !== 200) {
      throw new Error();
    }
    const { result } = data;
    const unsignedHex = result;
    return unsignedHex;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//Broadcast Signed Transaction
async function broadcastSignedTransaction(signedTxHex){
	// ### Send Signed Tx hex
	// curl  --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "sendrawtransaction", "params": ["0100000001e2e40bfeb263800b6b24120d2a42a543c96ef8084c5b7ffc889ed0474c1a50f0010000006b483045022100c9790b2e168d52b56870cf4671eefd78dd51033eeea82a500ef75c5455a41d3d0220526681462d01d969d5cdb84be104b97b82f006d484afaf3a6b3e639590e34856012103044680f1bdc06881a699981e82b24096f4f22bea51b13a5e781441e99cc4f96bffffffff020000000000000000306a2e7b987f72fe001f75a2908046bfac00c9505d4c0438b855915c6611a63bc1c339d95e7e149f2b777d948dbcbfb8e2a0210000000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000"]}' -H 'content-type: text/plain;' https://damp-ancient-water.btc.quiknode.pro/9b377f70086180fa6d1fc6153060f09e9dd26111/

	// 01000000011bac3304e50a12c2d7278a799d0124ed723fd8685376640f31fd19c8c0f76de2000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88acffffffff020000000000000000306a2e207328c545f5f9422fd7c1d3750e7115ecde96c78cca6b944829c68e46207e4975ee5c0e8fa3d534bdb38dc2cda218730100000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000 undefined;
	const body = {
		jsonrpc: "1.0",
		id: 'curltest',
		method: 'sendrawtransaction',
		params: [signedTxHex]
	};
	console.log(body);
	try {
		const response = await axios({
			method: 'post',
			url: BTC_URL,
			data: JSON.stringify(body),
			headers: {
				'Content-Type': 'text/plain'
			}});
		const { data, status } = response;
		if (status !== 200) {
			throw new Error();
		}
		return data;
	} catch (error) {
		console.log(error);
		return;
	}
}

//get XCP balance

//Check for burns
async function getXCPBurns(address) {
	const body = {
		jsonrpc: "2.0",
		id: 0,
		method: 'get_burns',
		params: {
			filters: [{
				field: "source",
				op: "==",
				value: address,
			}],
		}
	};
	try {
		const response = await axios({
			method: 'post',
			url: XCP_API_URL,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			data: JSON.stringify(body),
			auth: {
				username: XCP_API_USER,
				password: XCP_API_PASSWORD
			}
		});
		const { data, status } = response;
		if (status !== 200) {
			throw new Error();
		}
		return data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}
//set up XCP wallet

//send XCP function
async function sendXCP(source, destination, quantity, memo) {
	const unsignedHex = await createXCPSend(source, destination, quantity, memo);
	// TODO: add code for signing and transmitting tx
}

//TODO
//send away excess XCP

async function signp2pkhDataTX(wif, txHex, network) {
	const key = bitcoin.ECPair.fromWIF(wif);
	const txb = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(txHex), network);
	txb.sign(0, key);
	const signedTxHex = txb.build().toHex();
	return signedTxHex;
}
