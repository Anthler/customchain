const { GENESIS_DATA } = require("./config");
const crypptoHash = require("./crypto-hash");

class Block {
  constructor({ timestamp, data, hash, lastHash }) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    return new this({
      timestamp,
      lastHash,
      data,
      hash: crypptoHash(timestamp, lastHash, data)
    });
  }
}

// const block = new Block({
//   timestamp: "01/01/01",
//   data: "hello world",
//   hash: "abc",
//   lastHash: "last-hash"
// });

module.exports = Block;
