//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


import "./ERC20.sol";

contract SmartXCP is ERC20{

    address owner;
    mapping(address=>bool) minters;

    mapping(string=>bool) is_XCP_deposit_minted;

    uint public numSends;

    event RXCPminted(string XCP_txHash, string XCP_Address, address to, uint amount);
    event RXCPburnt(string XCP_Address, address from, uint amount);

    constructor() ERC20("RSK Smart XCP", "RXCP") {
        _mint(msg.sender, 0);
        owner = msg.sender;
    }

    function addMinter(address _minter) public{
        require(owner==msg.sender);
        minters[_minter] = true;
    }

    function removeMinter(address _minter) public{
        require(owner==msg.sender);
        minters[_minter] = false;
    }

    function mint(string memory XCP_txHash, string memory XCP_Address, uint amount, address to) public{
        require(is_XCP_deposit_minted[XCP_txHash]==false);
        require(minters[msg.sender]==true);
        is_XCP_deposit_minted[XCP_txHash] = true;
        numSends++;
        _mint(to,amount);
        emit RXCPminted(XCP_txHash,XCP_Address,to,amount);
    }

    function burn(string memory XCP_Address,uint amount) public{
        _burn(msg.sender,amount);
        emit RXCPburnt(XCP_Address, msg.sender, amount);
    }
}
