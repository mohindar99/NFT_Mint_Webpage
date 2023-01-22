// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract CyberPunkNFT is ERC721,Ownable {
    //owner is set by default by the Owner who deploy the contract
    uint256 public mintPrice;
    uint256 public totalSupply;//As of now what is the supply of NFT's
    uint256 public maxSupply; //maxsupply is that total number of NFT's which would ever be created
    uint256 public maxPerWallet;
    bool public  isPublicMintEnabled;//when the users need to mint
    string internal baseTokenUri;//uri when the images are located 
    address payable public withdrawWallet;
    mapping(address=>uint256) public walletMints;

 constructor() payable ERC721('CyberPunks','CP'){
    mintPrice = 0.02 ether;
    totalSupply=0;
    maxSupply=1000;
    maxPerWallet=3;
    //set withdraw address
 }

 function setPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner{
  isPublicMintEnabled = isPublicMintEnabled_;
 } 

function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
    baseTokenUri = baseTokenUri_;
}
function tokenURI(uint256 tokenId_) public view override returns(string memory){
    require(_exists(tokenId_),'Token does not exist!');
    return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_),".json"));
}
function withdraw() external onlyOwner{
    (bool success, ) = withdrawWallet.call{value:address(this).balance }('');
    require(success, 'withdrawfailed');
}
function mint(uint256 quantity_) public payable{
    require (isPublicMintEnabled,'minting not enabled');
    require (msg.value == quantity_ * mintPrice,'wrong mint value');
    require (totalSupply + quantity_ <= maxSupply,'sold out');
    require (walletMints[msg.sender]+quantity_ <= maxPerWallet,'sold out');

    for(uint256 i=0 ;i<quantity_ ;i++){
        uint256 newTokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(msg.sender,newTokenId);
    }
}
}
