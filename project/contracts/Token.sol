// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract Token is ERC20PresetMinterPauser{
    constructor() ERC20PresetMinterPauser("Polygon", "MATIC") {
        _mint(_msgSender(), 10000 * (10 ** uint256(decimals())));
    }
}