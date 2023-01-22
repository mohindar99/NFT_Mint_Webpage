import { Box, Flex, Button,Image, Link, Spacer } from "@chakra-ui/react";
import Facebook from "./assets/social-media-icons/facebook_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";
import { ethers } from "ethers";


const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  // here we are just requesting for the accounts to the meta mask and we get the number of accounts that exists to that account.
  // const connectAccount = async () => { 
  // }
  
  async function connectAccount() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", []);
      //or
      //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccounts(accounts);
    }
  }
  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* Leftside social media accounts */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="http:www.facebook.com">
          <Image src={Facebook} boxSize="42px" margin="0 15px" />
        </Link>

        <Link href="http:www.twitter.com">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>

        <Link href="http:www.email.com">
          <Image src={Email} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      {/*Right side - sections and connect*/}
      <Flex justify="space-between" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />

        {/* Connect*/}
        {isConnected ? (
          <Box margin="0 15px">Connected</Box>
        ) : (
          <Button 
          backgroundColor="#D6517D"
          borderRadius="5px"
          boxShadow="0px 4px 2px 1px #0F0F0F"
          color="white"
          cursor="pointer"
          fontFamily="inherit"
          margin="0 25px"
          onClick={connectAccount}>
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default NavBar;
