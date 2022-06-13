// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0<0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";




contract BlinkNFT is ERC721URIStorage ,Ownable{
    uint public mintprice;
    uint256 public totalSupply;
    uint256 public maxsupply;
    uint8 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenURI;
    address payable public withdrawwallet;
    mapping(address=>uint) public walletMints;

    constructor() payable ERC721("BlinkNFT","BN"){
        mintprice = 0.001 ether;
        totalSupply=0;
        maxsupply=10;
        maxPerWallet=3;
    }
    function SetpublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner{
        isPublicMintEnabled=_isPublicMintEnabled;
    }
    function SetaseTokenURI(string calldata _basetokenURI) external onlyOwner{
        baseTokenURI=_basetokenURI;
    }
    function tokenURI(uint _tokenId) public view override returns(string memory){
        require(_exists(_tokenId),"Token Doesn't Exists");
        return string(abi.encodePacked(baseTokenURI,Strings.toString(_tokenId),".json"));
    }
    function withdraw() external onlyOwner{
        (bool success,) = withdrawwallet.call{value:address(this).balance}("");
        require(success,"withdraw failed");
    }
    
    function mintNFT(uint _quantity)  public payable{
        require(isPublicMintEnabled,"Minting not enabled");
        require(msg.value==_quantity*mintprice,"Not enough Price");
        require(totalSupply+_quantity<=maxsupply,"NFTs Sold out");
        require(walletMints[msg.sender]+_quantity<=maxPerWallet,"Cannot Mint More Than 3");

         for(uint256 i=0;i<_quantity;i++){
            uint256 newTokenId= totalSupply+1;
            totalSupply++;
            _safeMint(msg.sender,newTokenId);
         }
    }
}