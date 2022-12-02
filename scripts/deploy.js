// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { network } = require("hardhat");
const hre = require("hardhat");
require('dotenv').config()

async function main() {

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await token.deployed();

  console.log(
    `Token deployed to ${token.address}`
  );

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log('Waiting for block confirmations...')
    await token.deployTransaction.wait(6)
    await verify(token.address, [])
  }
}

const verify = async (address, args) => {
  console.log("Verify contract...");

  try {
    await run("verify:verify", {
      address,
      constructorArguments: args
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log("Already Verified")
    } else {
      console.log(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
