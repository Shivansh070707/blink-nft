async function main() {
    const BlinkNFT = await ethers.getContractFactory("BlinkNFT");
  
    // Start deployment, returning a promise that resolves to a contract object
    const  blinkNFT = await  BlinkNFT.deploy();
    console.log("Contract deployed to address:",  blinkNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  // contract address  0xE60f1e6CcE81F5C083888f92baD17b2BCA29CA97