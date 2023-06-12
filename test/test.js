const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("JeanmiToken", function () {
  let JeanmiToken;
  let tokenInstance;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    JeanmiToken = await ethers.getContractFactory("JeanmiToken");
    tokenInstance = await JeanmiToken.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("mints tokens correctly", async function () {
    const amount = 10;

    await tokenInstance.mint(amount, {
      value: amount * 0.0001 * 10 ** 18,
    });

    expect(await tokenInstance.balanceOf(owner.address)).to.changeEtherBalance(owner, amount * 0.0001 * 10 ** 18);
  });

  it("withdraws ether correctly", async function () {
    const amount = 10;

    await tokenInstance.mint(amount, {
      value: amount * 0.0001 * 10 ** 18,
    });

    const initialBalance = await ethers.provider.getBalance(owner.address);

    await tokenInstance.withdraw()

    expect(await ethers.provider.getBalance(owner.address)).to.be.gt(
      initialBalance
    );
  });

  it("only owner can use withdraw function", async () => {
    const nonOwner = addr1;
    await expect(
      tokenInstance.connect(nonOwner).withdraw()
    ).to.be.revertedWith("Ownable: caller is not the owner");
    
    const amount = 10;

    await tokenInstance.mint(amount, {
      value: amount * 0.0001 * 10 ** 18,
    });

    const tx = await tokenInstance.withdraw();
    expect(tx).to.changeEtherBalance(owner, amount * 0.0001 * 10 ** 18);
  });
});