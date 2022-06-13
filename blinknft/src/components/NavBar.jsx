import React from "react";
// import{Box,Button,Flex,Image,Link,Spacer} from '@chakra-ui/react';

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }
    return (
      
     <nav>
      <ul>
        <li>About</li>
        <li>Mint</li>
        <li>Team</li>
        <li>{!isConnected ?  <button
          onClick={()=>{connectAccount()}}
        >Connect</button> : <span>Connected</span>}</li>
      </ul>
      </nav>   
  
    );
  }


export default NavBar;
