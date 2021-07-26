const Blockchain = require('./models/Blockchain');

const db = {
  blockchain: new Blockchain(),
  utxos: [],  
  reward: 100,                                  // Initial block reward (genesis reward)
  difficulty: BigInt("0x0" + "F".repeat(63)),  // Initial difficulty for mining
  hash_zero_cnt: 1,                            // Num of leading zeros for mining hash
  period_miningTime: 0,
  block_miningTime: 0
}

module.exports = db;
