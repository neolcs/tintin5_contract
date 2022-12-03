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

  it("Check Owner in whiteList", async function() {
    const whiteList = await token.getWhiteListLength();
    expect(whiteList.toString()).to.be.equal('1');

    const first = await token.whiteList(0);
    expect (first).to.be.equal(owner.address);
  })

  it("Check add new address to whiteList", async function() {
    await token.addWhiteList(second.address);
    await token.addWhiteList(third.address);

    const whiteListLength = await token.getWhiteListLength();
    expect(whiteListLength.toString()).to.be.equal('3');

    const secondItem = await token.whiteList(1);
    expect (secondItem).to.be.equal(second.address);

    const thirdItem = await token.whiteList(2);
    expect (thirdItem).to.be.equal(third.address);

  })
})