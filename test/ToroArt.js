const { expect } = require("chai");

describe("ToroArt Contract", () => {
  // The first token generated starts with id 0
  const firstTokenId = 0;

  const setup = async ({ maxSupply = 10000 }) => {
    const [owner] = await ethers.getSigners();
    const ToroArt = await ethers.getContractFactory("ToroArt");
    const deployed = await ToroArt.deploy(maxSupply);

    return {
      owner,
      deployed,
    };
  };

  describe("Deployment", () => {
    it("Set max supply to passed param", async () => {
      const maxSupply = 4000;
      const { deployed } = await setup({ maxSupply });
      const returnedMaxSupply = await deployed.maxSupply();
      expect(returnedMaxSupply).to.equal(returnedMaxSupply);
    });
  });

  describe("Minting", () => {
    it("Mints a new token and assigns it to owner", async () => {
      const { owner, deployed } = await setup({});
      await deployed.mint();

      const ownerOfMinted = await deployed.ownerOf(firstTokenId);
      expect(ownerOfMinted).to.equal(owner.address);
    });

    it("Has a minting limit", async () => {
      const maxSupply = 2;
      const { deployed } = await setup({ maxSupply });

      // Mint all
      await Promise.all([deployed.mint(), deployed.mint()]);

      // Assert the last minting
      await expect(deployed.mint()).to.be.revertedWith("No ToroArts left :(");
    });
  });

  describe("Token URI", () => {
    it("returns valid metadata", async () => {
      const { deployed } = await setup({});
      await deployed.mint();
      const tokenURI = await deployed.tokenURI(firstTokenId);
      const stringifiedTokenURI = await tokenURI.toString();
      const [, base64JSON] = stringifiedTokenURI.split(
        "data:application/json;base64,"
      );
      const stringifiedMetadata = await Buffer.from(
        base64JSON,
        "base64"
      ).toString("ascii");

      const metadata = JSON.parse(stringifiedMetadata);

      expect(metadata).to.have.all.keys(["name", "description", "image"]);
    });
  });
});
