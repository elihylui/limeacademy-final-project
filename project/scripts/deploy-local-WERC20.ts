import { ethers } from "hardhat";

async function main() {
    const wERC20 =  await ethers.getContractFactory("WERC20");
    const WERC20 = await wERC20.deploy();
    await WERC20.deployed();

    console.log("WERC20 deployed to:", WERC20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
