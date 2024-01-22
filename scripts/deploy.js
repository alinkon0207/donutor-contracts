// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // We get the contract to deploy.
  const Donutor = await hre.ethers.getContractFactory("Donutor");
  const donutor = await Donutor.deploy();

  await donutor.deployed();

  console.log("Donutor deployed to:", donutor.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });