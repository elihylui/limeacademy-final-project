// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IToken.sol";

contract BridgeBase {
  address public admin;
  IToken public token;

  event Transfer(
    address from,
    address to,
    uint amount,
    uint date
  );
  
  event Minted(
    address from,
    address to,
    uint amount,
    uint date
  );

  event Burned(
    address from,
    address to,
    uint amount,
    uint date
  );

  constructor(address _token) {
    admin = msg.sender;
    token = IToken(_token);
  }

  function burn(address to, uint amount) external {
    token.burn(to, amount);
    emit Burned(
      msg.sender,
      to,
      amount,
      block.timestamp
    );
  }

  function mint(address to, uint amount) external {
    token.mint(to, amount);
    emit Minted(
      msg.sender,
      to,
      amount,
      block.timestamp
    );
  }
}
