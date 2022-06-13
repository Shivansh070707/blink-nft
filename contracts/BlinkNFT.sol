// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0<0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";




contract BlinkNFT is ERC721 ,Ownable{
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint8 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address=>uint) public walletMints;

    constructor() payable ERC721("BlinkNFT","BN"){
        mintPrice = 0.001 ether;
        totalSupply=0;
        maxSupply=10;
        maxPerWallet=3;
    }
    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner{
        isPublicMintEnabled=_isPublicMintEnabled;
    }
    function SetaseTokenUri(string calldata _basetokenURI) external onlyOwner{
        baseTokenUri=_basetokenURI;
    }
    function tokenURI(uint _tokenId) public view override returns(string memory){
        require(_exists(_tokenId),"Token Doesn't Exists");
        return string(abi.encodePacked(baseTokenUri,Strings.toString(_tokenId),".json"));
    }
    function withdraw() external onlyOwner{
        (bool success,) = withdrawWallet.call{value:address(this).balance}("");
        require(success,"withdraw failed");
    }
    
    function mint(uint _quantity)  public payable{
        require(isPublicMintEnabled,"Minting not enabled");
        require(msg.value == _quantity*mintPrice,"Not enough Price");
        require(totalSupply+_quantity<=maxSupply,"NFTs Sold out");
        require(walletMints[msg.sender]+_quantity<=maxPerWallet,"Cannot Mint More Than 3");

         for(uint256 i=0;i<_quantity;i++){
            uint256 newTokenId= totalSupply+1;
            totalSupply++;
            _safeMint(msg.sender,newTokenId);
         }
    }
}