const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    
    const Token = await hre.ethers.getContractFactory("JeanmiToken");
    
    const token = await Token.deploy();
  
    const addr = await token.getAddress();
  
    console.log("Token address:", addr);
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });