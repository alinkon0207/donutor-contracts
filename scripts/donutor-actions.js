const hre = require("hardhat");

// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx}. ${address} - balance: `, await getBalance(address));
    idx++;
  }
}

async function main() {
  // Get the example accounts we'll be working with.
  const [tipper, creator] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const Donutor = await hre.ethers.getContractFactory("Donutor");
  const donutor = await Donutor.deploy();

  // Deploy the contract.
  await donutor.deployed();
  console.log("Donutor deployed to: ", donutor.address);

  // Check balances before the coffee purchase.
  const addresses = [tipper.address, creator.address];
  console.log("== start ==");
  await printBalances(addresses);

  // Buy the owner a few coffees.
  const donationAmount = {value: hre.ethers.utils.parseEther("0.001")};
  await donutor.connect(tipper).donate(creator.address, "Mika", "Sasi", donationAmount);
  await donutor.connect(creator).donate(tipper.address, "Ulad", "Dai deneg", donationAmount);

  const comments = await donutor.connect(tipper).getComments(creator.address);
  console.log({ comments });

  // Check balances after the coffee purchase.
  console.log("== bought coffee ==");
  await printBalances(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });