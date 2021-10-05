//import ether and bitcoin libraries
const ethers = require('ethers');
const axios = require('axios');

//const Rsk3 = require('@rsksmart/rsk3')
//rsk3 = new Rsk3("https://public-node.rsk.co",null)

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

getBalance()
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
	const xcpBalance = await getXCPBalance("1BS2eDhEZ3TwcwTBDNPSrKtskTd4Cyy9oN");
	console.log('XCP Balance');
	console.log(xcpBalance);
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

//send XCP function
async function sendXCP() {
}

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