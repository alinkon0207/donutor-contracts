require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const ALCHEMY_GOERLI_URL = process.env.ALCHEMY_GOERLI_URL;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: ALCHEMY_GOERLI_URL,
      accounts: [METAMASK_PRIVATE_KEY]
    },
    mainnet: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/fbsRjlPaE8fW2wUE0MrfFHpM6nCqBUnY',
      accounts: ['7a291c590b67cd3e0704b5b8baef715f592b5c42f113febcab5ebcf7ebba1fde']
    }
  }
};
