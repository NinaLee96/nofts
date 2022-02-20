const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("mynft", function () {
  it("Should mint and transfer NFT to someone", async function () {
    const NoFTs = await ethers.getContractFactory("NoFTs");
    const nofts = await NoFTs.deploy();
    await nofts.deployed();

    const recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
    const metadataURI = "cid/test.png";

    let balance = await nofts.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await nofts.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await nofts.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await nofts.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await nofts.payToMint(recipient, "foo", {
      value: ethers.utils.parseEther("0.05"),
    });
  });
});
