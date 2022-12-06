// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./WToken.sol";

contract EthBridge {

    WToken public _token;

    mapping(address => uint256) public amountLocked;

    event Locked( 
        address sender,
        uint amount,
        uint date
    );

    event Claimed(
        address sender,
        uint amount,
        uint date
    );

    constructor (WToken token) {
        _token = token;
    }

    function lock(uint amount) public {
        _token.transferFrom(msg.sender, address(this), amount);
        amountLocked[msg.sender] += amount;
        emit Locked(
            msg.sender,
            amount,
            block.timestamp
        );
    }

    function claim(uint amount) public {
        _token.transfer(msg.sender, amount);
        amountLocked[msg.sender] -= amount;
        emit Claimed(
            msg.sender,
            amount,
            block.timestamp
        );
    }
}
