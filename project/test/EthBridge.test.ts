import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

async function deployEthBridgeFixture() {
    const ethBridge = await ethers.getContractFactory("EthBridge");
    const wToken = await ethers.getContractFactory("WToken");
    const WToken = await wToken.deploy("testToken", "TKO");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const EthBridge = await ethBridge.deploy(WToken.address);

    return {ethBridge, EthBridge, wToken, WToken, owner, addr1, addr2};
}

describe("lock", function() {

    it("shoud emit Locked event", async function() {
        const {EthBridge, WToken, owner, addr1} = await loadFixture(deployEthBridgeFixture);

        await WToken.connect(owner).mint(addr1.address, 10);
        await WToken.connect(addr1).approve(EthBridge.address, 1);
        
        expect(await EthBridge.connect(addr1).lock(1)).to.emit(EthBridge, "Locked")
        expect(await WToken.balanceOf(addr1.address)).equals(9);
    });
});

describe("claim", function() {
    it("should emit Claimed event", async function() {
        const {EthBridge, WToken, owner, addr1} = await loadFixture(deployEthBridgeFixture);

        await WToken.connect(owner).mint(addr1.address, 10);
        await WToken.connect(addr1).approve(EthBridge.address, 1);
        await EthBridge.connect(addr1).lock(1);

        expect(await WToken.balanceOf(addr1.address)).equals(9);
        expect(await EthBridge.connect(addr1).claim(1)).to.emit(EthBridge, "Claimed");
        expect(await WToken.balanceOf(addr1.address)).equals(10);
    });
});
