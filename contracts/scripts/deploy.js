const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying BaseToken to Base blockchain...");

  // Get the ContractFactory and Signers
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));

  // Deploy BaseToken
  const BaseToken = await ethers.getContractFactory("BaseToken");
  const baseToken = await BaseToken.deploy(
    "Base Ecosystem Token", // name
    "BET", // symbol
    ethers.utils.parseEther("1000000") // initial supply: 1M tokens
  );

  await baseToken.deployed();

  console.log("BaseToken deployed to:", baseToken.address);
  console.log("Transaction hash:", baseToken.deployTransaction.hash);

  // Verify deployment
  const name = await baseToken.name();
  const symbol = await baseToken.symbol();
  const totalSupply = await baseToken.totalSupply();
  const maxSupply = await baseToken.MAX_SUPPLY();

  console.log("\n=== Deployment Summary ===");
  console.log("Token Name:", name);
  console.log("Token Symbol:", symbol);
  console.log("Total Supply:", ethers.utils.formatEther(totalSupply));
  console.log("Max Supply:", ethers.utils.formatEther(maxSupply));
  console.log("Owner:", await baseToken.owner());

  // Save deployment info
  const deploymentInfo = {
    network: "base",
    contractAddress: baseToken.address,
    deployerAddress: deployer.address,
    transactionHash: baseToken.deployTransaction.hash,
    blockNumber: baseToken.deployTransaction.blockNumber,
    gasUsed: baseToken.deployTransaction.gasLimit.toString(),
    timestamp: new Date().toISOString()
  };

  console.log("\nDeployment completed successfully!");
  console.log("Save this info for verification:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
