import {useState} from'react';
import {ethers,BigNumber} from'ethers';
import BlinkNFT from '../BlinkNFT.json';
const BlinkNFTAddress = "0xE60f1e6CcE81F5C083888f92baD17b2BCA29CA97";

const MainMint=({accounts,setAccounts})=>{
    const[mintAmount,setMintAmount]=useState(1);
    const isConnected=Boolean(accounts[0]);
    async function handleMint(){
      if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer=  provider.getSigner();
        const contract = new ethers.Contract(
          BlinkNFTAddress,
          BlinkNFT.abi,
          signer
        );
        try{
            const response = await contract.mint(BigNumber(mintAmount));
            console.log('response:  ', response);
            }
            catch(err){
            console.log("error:",err)
            }
      }
    }
    const handleDecrement=()=>{
        if(mintAmount<=1)return;
         setMintAmount(mintAmount-1);
       };
       const handleIncrement=()=>{
        if(mintAmount>=3)return;
         setMintAmount(mintAmount+1);
       };
       return(
        <div className='mintnft'>
          <div>
          <h1>BlinkNFT</h1>
          <p>This is Blink NFT</p>
          {/*Connect*/}
           {isConnected?(
            <div>
               <div>
                 <button onClick={handleDecrement}>-</button>
                 <input type="number"value={mintAmount} onChange={(e)=>{setMintAmount(e.target.value)}}/>
                 <button onClick={handleIncrement}>+</button>
               </div>
               <button onClick={handleMint}>Mint Now</button>
            </div>
            
          ):(
            <p>You are not connected yet</p>
            )}
          </div>
        </div>
       )
}

export default MainMint;