// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract WToken is ERC20PresetMinterPauser {

    constructor(string memory _name, string memory _symbol) ERC20PresetMinterPauser(_name, _symbol) {
        _mint(_msgSender(), 10000 * (10 ** uint256(decimals())));
}

}
