const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe("Block", () => {
  const timestamp = "today-1";
  const hash = "hsh-1";
  const data = ["data-1", "data-2"];
  const lastHash = "last-hash-1";

  const block = new Block({ timestamp, hash, data, lastHash });

  it("has a timestamp, lastash, data and hash property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.data).toEqual(data);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();
    console.log(genesisBlock);
    it("expects an instance of a block", () => {
      expect(genesisBlock instanceof Block).toBe(true);
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("returns n instance of a block ", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` to be the `hash` of the lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets a `timestamp`", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("creates SHA-256 `hash` based on proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
