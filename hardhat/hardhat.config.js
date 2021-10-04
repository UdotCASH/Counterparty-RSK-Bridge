require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "rsk",
  networks: {
    hardhat: {
    },
    rsk: {
      url: "https://public-node.testnet.rsk.co",
      accounts: ["0x32566ca285cb0f37971d680dc6e2f9dfaf1d7959cce4c748e6e819db931cfaf9"],
      gasPrice: 400000000
    }
  },
  solidity: {
    version: "0.8.0"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
