const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const db = require('./db');
const {PUBLIC_KEY} = require('./config');
// const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
// const BLOCK_REWARD = 50;  
const BLOCK_PERIOD = 5;  // After every N blocks, block reward will be halved, target diff will be increased
const EXPECTED_MINING_TIME = 500; //milliseconds

let mining = true;
mine();

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function getReward() {
  return db.reward;
}

function getDifficulty(){
  let diff = db.difficulty.toString(16);
  let iter = "0x"
  for(let i = 0; i < 64-diff.length; i++) {
    iter += "0";
  }
  diff = iter + diff;
  return diff;
}

function getLength(){
  return db.blockchain.blockHeight();
}

function getEffort(){
  return db.block_miningTime;
}

function mine() {
  if(!mining) return;

  if((db.blockchain.blockHeight() % BLOCK_PERIOD === 0) && 
      db.blockchain.blockHeight() !== 0) {
      // Adjust the reward:
      db.reward = Math.floor(db.reward / 2);
      // Adjust mining difficulty:
      if((db.period_miningTime / BLOCK_PERIOD) < EXPECTED_MINING_TIME) {
        db.hash_zero_cnt++;
        console.log("Mining difficulty has been increased")
      } else {
        if(db.hash_zero_cnt > 0) {
          db.hash_zero_cnt--;
          console.log("Mining difficulty has been decreased")
        }
      }
      let diff_str = "0x" ;
      for(let i = 0; i < db.hash_zero_cnt; i++) {
        diff_str += "0";
      }
      diff_str = diff_str + "F".repeat(64-db.hash_zero_cnt);
      db.difficulty = BigInt(diff_str);
      console.log(diff_str);
      // reset block mining timer:
      db.period_miningTime = 0;
    }  
  console.log("Current Blockchain Lenght: " + db.blockchain.blockHeight().toString());
  console.log("Current Miner Reward: " + db.reward.toString());
  //
  const block = new Block();
  const coinbaseUTXO = new UTXO(PUBLIC_KEY, db.reward);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);
  block.addTransaction(coinbaseTX);

  let t0 = performance.now();
  while(BigInt('0x' + block.hash()) >=  db.difficulty) {
    block.nonce++;
  }
  let t1 = performance.now();
  db.block_miningTime = t1-t0;
  db.period_miningTime += db.block_miningTime;
  console.log("-- Mining process took " + (t1 - t0) + " milliseconds.")
  console.log("Total period mining time: " + db.period_miningTime);
  block.execute();
  
  db.blockchain.addBlock(block);

  console.log(`Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);

  setTimeout(mine, 2000);
}

module.exports = {
  startMining,
  stopMining,
  getReward,
  getDifficulty,
  getLength,
  getEffort
};
