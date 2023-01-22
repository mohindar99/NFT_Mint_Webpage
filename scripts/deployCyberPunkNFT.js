
async function main() {
  const CyberPunkNFT = await ethers.getContractFactory("CyberPunkNFT");
  const cyberPunkNFT = await CyberPunkNFT.deploy();

  await cyberPunkNFT.deployed();
  console.log("CyberPunkNFT is deployed to :", cyberPunkNFT.address);
}

main()
  .then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
