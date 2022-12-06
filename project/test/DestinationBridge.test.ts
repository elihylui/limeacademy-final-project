import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

async function deployFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const destinationToken = await ethers.getContractFactory("TokenBase");
    const DestinationToken = await destinationToken.deploy("testToken", "TKO");

    const destinationBridge = await ethers.getContractFactory("DestinationBridge");
    const DestinationBridge = await destinationBridge.deploy(DestinationToken.address)

    return {owner, addr1, addr2, destinationToken, DestinationToken, destinationBridge, DestinationBridge}

}

describe("mint", function() {
    it("should emit Minted Event and add balance of addr1", async function() {
        const {owner, addr1, addr2, destinationToken, DestinationToken, destinationBridge, DestinationBridge} = await loadFixture(deployFixture);

        await DestinationToken.updateAdmin(DestinationBridge.address);

        expect(await DestinationToken.balanceOf(addr1.address)).equals(0);
        expect(await DestinationBridge.mint(addr1.address, 1)).to.emit(DestinationBridge, "Minted")
        expect(await DestinationToken.balanceOf(addr1.address)).equals(1);

    });

});

describe("burn", function() {
    it("should emit Burned", async function() {
        const {owner, addr1, addr2, destinationToken, DestinationToken, destinationBridge, DestinationBridge} = await loadFixture(deployFixture);

        await DestinationToken.updateAdmin(DestinationBridge.address);
        await DestinationBridge.mint(addr1.address, 1);

        expect(await DestinationToken.balanceOf(addr1.address)).equals(1);
        expect(await DestinationBridge.burn(addr1.address, 1)).to.emit(DestinationBridge, "Burned")
        expect(await DestinationToken.balanceOf(addr1.address)).equals(0);
    })
})