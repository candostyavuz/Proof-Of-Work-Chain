const client = require('./client');

client.request('getReward', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); // success!
});
