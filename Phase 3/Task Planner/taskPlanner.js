let http = require("http");
let fs = require("fs");
let url = require("url");
let PORT = 9090;

let indexPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>2058499 Task Planner</title>
    </head>
    <body>
        <h1>Task Planner</h1>
        <h2>Add Task</h2>
        <form action="addTask">
            <label for="empId">Employee ID: </label>
            <input type="text" name="empId"><br>
            <label for="taskId">Task ID: </label>
            <input type="text" name="taskId"><br>
            <label for="task">Task: </label>
            <input type="text" name="task"><br>
            <label for="deadline">Deadline: </label>
            <input type="date" name="deadline"><br>
            <input type="submit" value="Add Task">
        </form>
        <br><hr>
        <h2>Delete Task</h2>
        <form action="deleteTask">
            <label for="delTaskId">Task ID: </label>
            <input type="text" name="delTaskId"><br>
            <input type="submit" value="Delete Task">
        </form>
        <br><hr>
        <h2>List Task</h2>
        <form action="listTasks">
            <input type="submit" value="List All Tasks">
        </form>
    </body>
    </html>
`;

let tableHeader = `
    <table border=1>
        <tr>
            <th>Employee ID</th>
            <th>Task ID</th>
            <th>Task</th>
            <th>Deadline</th>
        </tr>
`;

let tableFooter = `
    </table>
`;

let server = http.createServer((request, response) => {
    let urlInfo = url.parse(request.url, true);

    if (urlInfo.path != "favicon.ico"){
        let tasks = JSON.parse(fs.readFileSync("./tasks.json").toString());
        let urlQuery = urlInfo.query;

        response.writeHead(200, {"content-type":"text/html"});

        if (urlInfo.pathname == "/addTask"){
            let taskIdExist = tasks.find(task => task.taskId == urlQuery.taskId);

            // undefined = not existed
            if (taskIdExist == undefined){
                tasks.push(urlQuery);
                fs.writeFileSync("./tasks.json", JSON.stringify(tasks));
                response.write(`<p style="color:green">Task ID ${urlQuery.taskId} added</p>`);
            } else {
                response.write(`<p style="color:red">Error: Task ID ${urlQuery.taskId} existed</p>`);
            }

            response.write(indexPage);
        } else if (urlInfo.pathname == "/deleteTask"){
            let taskIndex = tasks.findIndex(task => task.taskId == urlQuery.delTaskId);
            // -1 = not found
            if (taskIndex == -1){
                response.write(`<p style="color:red">Error: Task ID ${urlQuery.delTaskId} does not existed</p>`);
            } else {
                tasks.splice(taskIndex, 1); // delete 1 element starting from index=taskIndex 
                fs.writeFileSync("./tasks.json", JSON.stringify(tasks));
                response.write(`<p style="color:green">Task ID ${urlQuery.delTaskId} deleted</p>`);
            }

            response.write(indexPage);
        } else if (urlInfo.pathname == "/listTasks") {
            let tasksTable = tableHeader;

            tasks.forEach(task => {
                tasksTable += `
                    <tr>
                        <td>${task.empId}</td>
                        <td>${task.taskId}</td>
                        <td>${task.task}</td>
                        <td>${task.deadline}</td>
                    </tr>
                `;
            });

            tasksTable += tableFooter;

            response.write(indexPage);
            response.write(tasksTable);
        } else {
            response.write(indexPage);
        }
    }

    response.end();
});

server.listen(PORT, () => {
    console.log("Server is running on localhost:" + PORT);
});
