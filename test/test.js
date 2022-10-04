const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT contract", function () {

  let nft;
  let nft_webpage;
  let owner;
  let addr1;
  let addr2;
  let addrs;

    beforeEach(async function () {
      
    nft = await ethers.getContractFactory("CyberPunkNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nft_webpage = await nft.deploy();
  });

    describe("deployment", function () {
      
        it("Should go to the right owner", async function () {
        expect(await nft_webpage.owner()).to.equal(owner.address);        
    });

        it("Check max nfts per wallet", async function () {
         const max_nfts = await nft_webpage.maxPerWallet();
         expect(max_nfts).to.equal(3);
    });
  });

  describe("Total Supply of nfts", function () {

    it("max supply of tokens", async function () {
      const totalsupply = await nft_webpage.maxSupply();
      expect(totalsupply).to.equal(1000);

    });
  });

  describe("checking public mint option", function () {

    it("Should be reverted because the caller is not owner", async function () {
      await expect(
        nft_webpage.connect(addr1).setPublicMintEnabled(true)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should should set isAllowListActive by owner", async function () {
      const expectedValue = true;
      await nft_webpage.connect(owner).setPublicMintEnabled(expectedValue);
      expect(await nft_webpage.isPublicMintEnabled()).to.equal(expectedValue);

    });

    /* it("not enabling publicmint while using mint option",async function(){
            await nft_webpage.connect(owner).setPublicMintEnabled(false);
           expect(await nft_webpage.connect(addr1).mint(1,{ value: ethers.utils.parseEther("0.02")})).to.be.revertedWith('minting not enabled');
        })*/
  });

  describe("checking withdraw option", function () {

    it("Should be reverted because the caller is not owner", async function () {
      await expect(nft_webpage.connect(addr1).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("Checking mint of Nfts", function () {

    it("Checking the minting values", async function () {
      await nft_webpage.connect(owner).setPublicMintEnabled(true);
      await nft_webpage
        .connect(owner)
        .mint(1, { value: ethers.utils.parseEther("0.02") });
      const owner_balance = await nft_webpage.balanceOf(owner.address);
      expect(owner_balance).to.be.equal(1);
    });
  });
});
