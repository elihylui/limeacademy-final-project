import { ethers } from "hardhat";

async function main() {
    const wToken = await ethers.getContractFactory("WToken");
    const WToken = await wToken.deploy("TestToken", "TKO"); 
    const ethBridge =  await ethers.getContractFactory("EthBridge");
    const EthBridge = await ethBridge.deploy(WToken.address);
    await EthBridge.deployed();

    console.log("EthBridge deployed to:", EthBridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
