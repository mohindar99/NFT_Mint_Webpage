import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import CyberPunkNFT from "./CyberPunkNFT.json";

const cyberPunkNFTAddress = "0x8De038C4FF8533fD09e24308EaB519fBc0f30E0D";

const MainMint = ({ accounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [maxsupply, setmaxsupply] = useState(0);
  const isConnected = Boolean(accounts[0]);

 const handleMint = async ()=> {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        cyberPunkNFTAddress,
        CyberPunkNFT.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response :", response);
      } catch (err) {
        console.log("error", err);
      }
    }
  }
  async function getmax() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract( 
        cyberPunkNFTAddress,
        CyberPunkNFT.abi,
        provider
      );
      const response = await contract.maxSupply();
      setmaxsupply(response);
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };
  return (
    <Flex justify="center" align="center" height="100vh" padding="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            CyberPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            It's 2080 . Can the Cyberpunks NFT save humans from destructive
            rampant NFT speculation? Mint cyberPunks to findout.
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                margin="0 15px"
                onClick={handleDecrement}
              >
                {" "}
                -{" "}
              </Button>
              <Input
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                margin="0 15px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <br/>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              margin="0 15px"
              onClick={handleMint}
            >
              Mint Now
            </Button>
            <div>
              <Input
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={maxsupply}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                margin="0 15px"
                onClick={getmax}
              >
                Get balance
              </Button>
            </div>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#D6517D"
          >
            You are not connected to Mint.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
