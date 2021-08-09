function addTask() {
  var clientName = document.getElementById("client").value;
  var projectName = document.getElementById("project").value;
  var budget = document.getElementById("budget").value;
  document.getElementById("client").value = "";
  document.getElementById("project").value = "";
  document.getElementById("budget").value = "";

  let task = {
    clientName: clientName,
    projectName: projectName,
    budget: budget,
  };

  var table;

  if (sessionStorage.table) {
    table = JSON.parse(sessionStorage.getItem("table"));
  } else {
    table = [];
  }
  table.push(task);
  sessionStorage.setItem("table", JSON.stringify(table));
}

function showTask() {
  var startTable =
    "<table id='budgetTable' style='border-width: 2px; border-style: solid;'><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
  var tableContent = "";
  if (sessionStorage.table) {
    var table = JSON.parse(sessionStorage.getItem("table"));
    console.log(table);
    let i = 0;
    while (i < table.length) {
      tableContent +=
        "<tr><td>" +
        table[i].clientName +
        "</td><td>" +
        table[i].projectName +
        "</td><td>" +
        table[i].budget +
        "</td></tr>";
      i++;
    }
    var endTable = "</table>";
    tableContent = startTable + tableContent + endTable;
    document.getElementById("table").innerHTML = tableContent;
  } else {
    var startTable =
      "<table id='budgetTable' style='border-width: 2px; border-style: solid;'><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr></table>";
    document.getElementById("table").innerHTML = tableContent;
  }
}

function reset() {
  document.getElementById("client").value = "";
  document.getElementById("project").value = "";
  document.getElementById("budget").value = "";
}
