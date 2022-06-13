/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-etherscan");
 const { API_URL, PRIVATE_KEY ,ETHERSCAN_KEY} = process.env;

 task("accounts","Prints the list of accounts",async( taskargs , hre)=>{
  const accounts= await hre.ethers.getSigners();
  for(const account of accounts){
    console.log(account.address);
  }
 });

 module.exports = {
   solidity: "0.8.7",
   defaultNetwork: "rinkeby",
   networks: {
     hardhat: {},
     rinkeby: {
       url: API_URL,
       accounts: [`0x${PRIVATE_KEY}`],
     },
     
   },
   etherscan:{
    apikey:{
      rinkeby:ETHERSCAN_KEY,
   }
 }
 }
