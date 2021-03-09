async function doSubmit() {
  let ele = document.getElementById("url_input");
  let obj = {
    url: ele.value,
  };
  let response = await fetch("/api/shorturl/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  let result = await response.json();
  if (result.shorturl) {
    const url = "http://localhost:3000/" + result.shorturl;
    document.getElementById("link").innerHTML = "Your shortened URL 👉🏼 " + url;
    document.getElementById("link").href = url;
  } else if (result.shorturl == null || result.shorturl == undefined) {
    window.location.href = "/404.html";
  }
}

async function gotoStats() {
  let response = await fetch("/api/stats", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  let result = await response.json();
  console.log(result);
  if (result) {
    const divStats = document.getElementById("tables");
    if (divStats.style.display === "block") {
      divStats.style.display = "none";
    } else {
      divStats.style.display = "block";
    }
    const urlsStat = document.getElementById("url-statistic");
    urlsStat.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const tableRows = document.createElement("tr");
      urlsStat.appendChild(tableRows);
      console.log(result[i]);
      for (let prop in result[i]) {
        const tableData = document.createElement("td");
        tableData.innerText = result[i][prop];
        tableRows.append(tableData);
      }
    }
  } else if (result == null || result == undefined || result.length == 0) {
    window.location.href = "/404.html";
  }
}
