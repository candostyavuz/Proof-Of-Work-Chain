const client = require('./client');

client.request('getDifficulty', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); // success!
});
