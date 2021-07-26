const client = require('./client');

client.request('getLength', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); // success!
});
