import { ethers } from "hardhat";

async function main() {
    const polygonBridge =  await ethers.getContractFactory("PolygonBridge");
    const PolygonBridge = await polygonBridge.deploy();
    await PolygonBridge.deployed();

    console.log("PolygonBridge deployed to:", PolygonBridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
