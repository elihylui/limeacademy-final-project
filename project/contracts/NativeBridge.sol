// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NativeBridge {
    address owner;
    bytes32[] public whitelistedSymbols;
    mapping(bytes32 => address) public whitelistedTokens;
    mapping(address=> mapping(bytes32 => uint256)) public balances;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        balances[msg.sender]["Eth"] += msg.value;
    }

    function withdrawEther(uint amount) external {
        require(balances[msg.sender]["Eth"] >= amount, "insufficient funds");

        balances[msg.sender]["Eth"] -= amount;
        payable(msg.sender).call{value: amount}("");
    }

    function depositTokens(uint amount, bytes32 symbol) external {
        balances[msg.sender][symbol] += amount;
        IERC20(whitelistedTokens[symbol]).transferFrom(msg.sender, address(this), amount);
    }

    function withdrawTokens(uint amount, bytes32 symbol) external {
        require(balances[msg.sender][symbol] >= amount, "insufficient funds");

        balances[msg.sender][symbol] -= amount;
        IERC20(whitelistedTokens[symbol]).transfer(msg.sender, amount);
    }

    function getBalance(bytes32 symbol) external view returns(uint256) {
        return balances[msg.sender][symbol];
    }
}