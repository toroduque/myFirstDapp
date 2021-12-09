const deploy = async () => {
    const [deployer] = await ethers.getSigners();

    console.log("🚀 Deploying contract with the account:", deployer.address);
    const ToroArt = await ethers.getContractFactory("ToroArt");
    const deployed = await ToroArt.deploy();
    console.log("✅ Toro Art has been deployed at:", deployed.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
