require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const { SIGNER_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [SIGNER_PRIVATE_KEY],
    },
  },
};
