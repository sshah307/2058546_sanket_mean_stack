var jsonArr = new Array();
function addCart(name, val) {
  var currCount = parseInt(sessionStorage.getItem("1"));
  currCount++;
  document.getElementById("cartValue").innerHTML = "" + currCount;
  var jsonObj = { item: name, price: val };
  if (sessionStorage.getItem("0") === null) {
    jsonArr.push(jsonObj);
    sessionStorage.setItem("0", JSON.stringify(jsonArr));
  } else {
    var newJSON = sessionStorage.getItem("0");
    var parsedJSON = JSON.parse(newJSON);
    jsonArr = [];
    for (var i = 0; i < parsedJSON.length; i++) {
      jsonArr[i] = parsedJSON[i];
    }
    jsonArr.push(jsonObj);
    sessionStorage.setItem("0", JSON.stringify(jsonArr));
  }
  sessionStorage.setItem("1", "" + currCount);
}
function setInitialCount() {
  if (sessionStorage.getItem("1") === null) {
    sessionStorage.setItem("1", "" + 0);
  } else {
    var currCount = parseInt(sessionStorage.getItem("1"));
    document.getElementById("cartValue").innerHTML = "" + currCount;
  }
}
function getList() {
  var jsonData = sessionStorage.getItem("0");
  var parsedJSON = JSON.parse(jsonData);
  var table = document.getElementById("myTable");
  var total = 0;
  for (var i = 0; i < parsedJSON.length; i++) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = parsedJSON[i].item;
    cell2.innerHTML = parsedJSON[i].price;
    total += parseInt(parsedJSON[i].price, 10);
  }
  document.getElementById("totalVal").innerHTML = "" + total;
}
