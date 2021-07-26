import "./index.scss";

function getEffort() {

  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'getEffort' })
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(response => {
      document.getElementById("effort").innerHTML = (response.blockEffort + " ms");
    });
}
setInterval(getEffort, 500);

function getLength() {

  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'getLength' })
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(response => {
      document.getElementById("chainlength").innerHTML = response.blockLength;
    });
}
setInterval(getLength, 500);

function getDifficulty() {

  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'getDifficulty' })
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(response => {
      document.getElementById("difficulty").innerHTML = response.blockDifficulty;
    });
}
setInterval(getDifficulty, 500);

function getReward() {

  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'getReward' })
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(response => {
      document.getElementById("reward").innerHTML = response.blockReward + " coins";
    });
}
setInterval(getReward, 500);

function getBalance() {
  const address = "04979148587309a63aea4b4e5a58e048bb0c2a706fde3b58ba3028ca36a9046964cb3e03ca17d4a880f1ac4ce8be67497422a9facca3da695b081c8c6414896778";

  const params = {
    method: "getBalance",
    params: [address],
    jsonrpc: "2.0",
    id: 1
  }

  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(response => {
      document.getElementById("balance").innerHTML = response.balance + " coins";
    });
}
setInterval(getBalance, 500);
//

document.getElementById("start-mining").addEventListener('click', () => {
  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'startMining' })
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(({blockNumber}) => {
      alert(`Started @ block ${blockNumber}`);
    });
});

document.getElementById("stop-mining").addEventListener('click', () => {
  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'stopMining' })
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(({blockNumber}) => {
      alert(`Stopped @ block ${blockNumber}`);
    });
});
