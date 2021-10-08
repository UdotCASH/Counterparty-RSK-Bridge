//import ether and bitcoin libraries
const ethers = require('ethers');
const axios = require('axios');

//const Rsk3 = require('@rsksmart/rsk3')
//rsk3 = new Rsk3("https://public-node.rsk.co",null)

const BTC_MAINNET = bitcoin.networks.bitcoin;

//console.log(rsk3)
const XCP_API_URL = "http://public.coindaddy.io:4000";
const XCP_API_USER = "rpc";
const XCP_API_PASSWORD = "1234";
let smartXCPAddress = "0x6bF7F83152B94961127934D1033Ff8764b84AdBd"
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

let provider = new ethers.providers.JsonRpcProvider("https://public-node.testnet.rsk.co")
//0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8
let mnemonic = "type sustain gold vivid ship galaxy claw age receive make because adult"
let walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
let walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey)
walletPrivateKey = walletPrivateKey.connect(provider)
console.log(walletPrivateKey.address)

smartXCP = new ethers.Contract(smartXCPAddress,smartXCPABI,walletPrivateKey)

let burns = new Array()
let mints = new Array()

//getBalance()
sendtest()
console.log("send")
//signtest()
async function sendtest(){
	let rawTransaction = await createXCPSend("18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP", "12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7", 299999997, "memolobo");
	console.log(rawTransaction)
}
async function getBalance(){
  let balance = await smartXCP.balanceOf("0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8")
  console.log(balance)
  //await mint()
  await getMints()
  await getBurns()
	const sends = await getSends("1BS2eDhEZ3TwcwTBDNPSrKtskTd4Cyy9oN");
	console.log('Sends');
	console.log(sends);
	const burns = await getBurns("1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7");
	console.log('Burns');
	console.log(burns);
	const xcpBalance = await getXCPBalance("1GRJD3KrSiDHvcUYyfWFmgcNci8CHo1LoJ");
	console.log('XCP Balance');
	console.log(xcpBalance);
	const unsignedHex = await createXCPSend("1BS2eDhEZ3TwcwTBDNPSrKtskTd4Cyy9oN", "1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7", 1, "1234");
	console.log('unsigned hex');
	console.log(unsignedHex);
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
  let numBurns = await smartXCP.numBurns()
  for (i=0;i<numBurns;i++){
    burns.push(await smartXCP.RXCPburns(i))
  }
  console.log(burns)
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

async function createXCPSend(source, destination, quantity, memo) {
	let unsignedHex;
	const body = {
		jsonrpc: "2.0",
		id: 0,
		method: 'create_send',
		params: {
			source,
			destination,
			asset: "XCP",
			quantity,
		}
	};
	if (typeof memo === 'string') {
		body.params.memo = memo;
	}
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
		const { result } = data;
		unsignedHex = result;
		return unsignedHex;
	} catch (error) {
		console.log(error);
		return(error);
	}
}
async function signtest(){
	let b = await signRawTransaction("KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57")
//12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7
//WIF KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57
}
//Sign Raw Transactiion
//returns hex of signed transaction
async function signRawTransaction(wif, rawTxHex){
	let key = bitcoin.ECPair.fromWIF(wif,BTC_MAINNET);
	let txb = bitcoin.TransactionBuilder.fromTransaction (bitcoin.Transaction.fromHex (rawTxHex), BTC_MAINNET);
	txb.sign(0, key);

	return(txb.build().toHex());
}

//Broadcast Signed Transaction
async function broadcastSignedTransaction(signedTxHex){
	// ### Send Signed Tx hex
	// curl  --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "sendrawtransaction", "params": ["0100000001e2e40bfeb263800b6b24120d2a42a543c96ef8084c5b7ffc889ed0474c1a50f0010000006b483045022100c9790b2e168d52b56870cf4671eefd78dd51033eeea82a500ef75c5455a41d3d0220526681462d01d969d5cdb84be104b97b82f006d484afaf3a6b3e639590e34856012103044680f1bdc06881a699981e82b24096f4f22bea51b13a5e781441e99cc4f96bffffffff020000000000000000306a2e7b987f72fe001f75a2908046bfac00c9505d4c0438b855915c6611a63bc1c339d95e7e149f2b777d948dbcbfb8e2a0210000000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000"]}' -H 'content-type: text/plain;' https://damp-ancient-water.btc.quiknode.pro/9b377f70086180fa6d1fc6153060f09e9dd26111/

	const body = {
		jsonrpc: "2.0",
		id: 0,
		method: 'sendrawtransaction',
		params: [signedTxHex]
	};
	if (typeof memo === 'string') {
		body.params.memo = memo;
	}
	try {
		const response = await axios({
			method: 'post',
			url: XCP_API_URL,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},t { data, status } = response;
		if (status !== 200) {
			throw new Error();
		}
		const { result } = data;
		unsignedHex = result;
		return unsignedHex;
	} catch (error) {
		console.log(error);
		return01000000011bac3304e50a12c2d7278a799d0124ed723fd8685376640f31fd19c8c0f76de2000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88acffffffff020000000000000000306a2e207328c545f5f9422fd7c1d3750e7115ecde96c78cca6b944829c68e46207e4975ee5c0e8fa3d534bdb38dc2cda218730100000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000 undefined;
	}
}
async function signtest(){
	let b = await signRawTransaction("KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57")
//12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7
//WIF KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57
}
//Sign Raw Transactiion
//returns hex of signed transaction
async function signRawTransaction(wif, rawTxHex){
	let key = bwTransaction = await createXCPSend("18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP", "12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7", 299999997, "memolobo");
	console.log(rawTransaction)
}
async function getBalance(){
  let balance = await smartXCP.balanceOf("0xc914602e25FCD44879f8D9a67c17D58Bd2E67af8")
  console.log(balance)
  //await mint()
  await getMints()
  await getBurns()
	const sends = await getSends("1BS2eDhEZ3TwcwTBDNPSrKtskTd4Cyy9oN");
	console.log('Sends');
	console.log(sends);
	const burns = await getBurns("1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7");
	console.log('Burns');
	console.log(burns);
	const xcpBalance = await getXCPBalance("1GRJD3KrSiDHvcUYyfWFmgcNci8CHo1LoJ");
	console.log('XCP Balance');
	console.log(xcpBalance);
	const unsignedHex = await createXCPSend("1BS2eDhEZ3TwcwTBDNPSrKtskTd4Cyy9oN", "1NT4pDJScATaWR3bqXv8NSBGmBoYHrVnz7", 1, "1234");
	console.log('unsigned hex');
	console.log(unsignedHex);
}

// init()
//
// //init
// function init(){
//   // wallet = new ethers.
//   // smartXCP = new ethers.Contract()
// }
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

async function getBurns(){
  let numBurns = await smartXCP.numBurns()
  for (i=0;i<numBurns;i++){
    burns.push(await smartXCP.RXCPburns(i))
  }
  console.log(burns)
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
		returnmethod: 'post',
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

//Check for burns
async function getBurns(address) {
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
	} data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

//Check for burns
async function getBurns(address) {
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
		}
		return data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}


async function signtest(){
	let b = await signRawTransaction("KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57")
//12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7
//WIF KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57
}
//Sign Raw Transactiion
//returns hex of signed transaction
async function signRawTransaction(wif, rawTxHex){
	let key = bitcoin.ECPair.fromWIF(wif,BTC_MAINNET);
	let txb = bitcoin.TransactionBuilder.fromTransaction (bitcoin.Transaction.fromHex (rawTxHex), BTC_MAINNET);
	txb.sign(0, key);

	return(txb.build().toHex());
}

async function signtest(){
	let b = await signRawTransaction("KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57")
//12HyNbsSHezqr4nXRmNSRp5XJGP1zkuLM7
//WIF KyTCo35UuQ4KsTLsSUf1zs1pqG3Z73fyAcXMQgfHuzZpuTEoup57
}
//Sign Raw Transactiion
//returns hex of signed transaction
async function signRawTransaction(wif, rawTxHex){
	let key = bitcoin.ECPair.fromWIF(wif,BTC_MAINNET);
	let txb = bitcoin.TransactionBuilder.fromTransaction (bitcoin.Transaction.fromHex (rawTxHex), BTC_MAINNET);
	txb.sign(0, key);

	return(txb.build().toHex());
}
