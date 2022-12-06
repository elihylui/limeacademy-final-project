import { ethers } from "hardhat";

async function main() {
    const wToken =  await ethers.getContractFactory("WToken");
    const WToken = await wToken.deploy();
    await WToken.deployed();

    console.log("WToken deployed to:", WToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
