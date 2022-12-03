// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {

    uint256 public autoMintAmount = 10 * (10 ** uint256(decimals())) ;
    uint256 public initMintTime = 0;
    address[] public whiteList;

    constructor () ERC20("TinTinTestToken", "TTT") {
        whiteList.push(msg.sender);
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function autoMint() public {
        require(block.timestamp > initMintTime + 60,"only when time allowed");
        for (uint i = 0; i < whiteList.length; ++i) {
            _mint(whiteList[i], autoMintAmount);
        }
        
        initMintTime = block.timestamp;
    }

    function isInWhiteList(address a) private view returns (bool) {
        bool inWhiteList = false;
        for (uint i = 0; i < whiteList.length; ++i) {
            if (a == whiteList[i]) {
                inWhiteList = true;
                break;
            }
        }
        return inWhiteList;
    }

    function addWhiteList(address adds) public onlyOwner {
        require(adds != address(0), "address not valid");

        bool inWhiteList = isInWhiteList(adds);
        require(false == inWhiteList, "Already in WhiteList");
        whiteList.push(adds);
    }

    function changeAmount(uint256 amount) public onlyOwner {
        autoMintAmount = amount;
    }

    function getWhiteListLength() public view returns (uint256) {
        return whiteList.length;
    }

}