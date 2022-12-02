const {ethers} = require("hardhat");
const { expect } = require('chai')

describe("token test", () => {
  let owner, Token, token;
  let second, third;

  beforeEach(async function(){
    [owner, second, third] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
  })

  it("Check Price", async function() {
    expect(await RocketInstance.getPrice()).to.be.equal(1000);
  })

  it("check buy function", async function() {
    await RocketInstance.connect(second).buy(3000);
    expect(await RocketInstance.balanceOf(second)).to.be.equal(3);
  })
})