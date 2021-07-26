const {startMining, stopMining, getReward, getDifficulty, getLength, getEffort} = require('./mine');
const {PORT} = require('./config');
const {utxos, blockchain, reward} = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const {method, params} = req.body;
  if(method === 'startMining') {
      startMining();
      res.send({ blockNumber: blockchain.blockHeight() });
      return;
  }
  if(method === 'stopMining') {
      stopMining();
      res.send({ blockNumber: blockchain.blockHeight() });
      return;
  }
  if(method === "getBalance") {
      const [address] = params;
      const ourUTXOs = utxos.filter(x => {
        return x.owner === address && !x.spent;
      });
      const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);
      res.send({ balance: sum.toString()});
  }
  if(method === "getReward") {
    let reward_res = getReward();
    res.send({blockReward: reward_res});
    return;
  }
  if(method === "getDifficulty") {
    let diff_res = getDifficulty();
    res.send({blockDifficulty: diff_res});
    return;
  }
  if(method === "getLength") {
    let length_res = getLength();
    res.send({blockLength: length_res});
    return;
  }
  if(method === "getEffort") {
    let effort_res = getEffort();
    res.send({blockEffort: effort_res});
    return;
  }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
