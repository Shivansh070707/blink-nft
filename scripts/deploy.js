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

  //contract address 0x3B5BeDb5E211968b395fc91e9a20810E0bEB7943