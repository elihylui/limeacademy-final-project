// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Token.sol";

contract DestinationBridge  {

  Token token;

  constructor() {
    Token _token = new Token(); //minting Tokens for this DestinationBridge contract
    token = _token;
  }
  
  function mint(uint amount) public {
    token.mint(msg.sender, amount);
  }

  function burn(uint amount) public {
    token.burn(amount);
  }
}
