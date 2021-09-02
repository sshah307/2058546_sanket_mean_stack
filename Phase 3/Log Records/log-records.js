function logRecords() {
  let fs = require("fs");
  let readlineSync = require("readline-sync");
  let records = JSON.parse(fs.readFileSync("./logs.json"));
  let moreRecord = "n";

  do {
    let firstname = readlineSync.question("Enter first name: ");
    let lastname = readlineSync.question("Enter last name: ");
    let gender = readlineSync.question("Enter your gender: ");
    let email = readlineSync.question("Enter your email: ");
    let datetime = Date();

    records.push({
      firstname,
      lastname,
      gender,
      email,
      datetime,
    });

    moreRecord = readlineSync.question("More record? (y/n) ");
  } while (moreRecord == "y");

  fs.writeFileSync("./logs.json", JSON.stringify(records));
  console.log("Record saved!");
}

logRecords();
