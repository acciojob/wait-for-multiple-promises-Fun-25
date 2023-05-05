function multiplePromises() {
  let output = document.getElementById("output");
  let promises = [];

  for (let i = 0; i < 3; i++) {
    const timeout = Math.floor(Math.random() * 3) + 1;
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Promise ${i + 1} resolved after ${timeout} seconds`);
        }, timeout * 1000);
      })
    );
  }

  let loadingRow = document.createElement("tr");
  let loadingText = document.createElement("td");
  loadingText.setAttribute("colspan", "2");
  loadingText.innerText = "Loading...";
  loadingRow.appendChild(loadingText);
  output.appendChild(loadingRow);

  Promise.all(promises)
    .then((responses) => {
      output.removeChild(loadingRow);

      let totalTime = 0;
      for (let i = 0; i < responses.length; i++) {
        let responseRow = document.createElement("tr");
        let nameCol = document.createElement("td");
        nameCol.innerText = `Promise ${i + 1}`;
        responseRow.appendChild(nameCol);

        let timeCol = document.createElement("td");
        let timeTaken = parseFloat(responses[i].split(" ")[3]);
        totalTime += timeTaken;
        timeCol.innerText = `${timeTaken} seconds`;
        responseRow.appendChild(timeCol);

        output.appendChild(responseRow);
      }

      let totalRow = document.createElement("tr");
      let totalName = document.createElement("td");
      totalName.innerText = "Total";
      totalRow.appendChild(totalName);

      let totalTimeCol = document.createElement("td");
      totalTimeCol.innerText = `${totalTime.toFixed(3)} seconds`;
      totalRow.appendChild(totalTimeCol);

      output.appendChild(totalRow);
    })
    .catch((error) => console.log(error));
}
