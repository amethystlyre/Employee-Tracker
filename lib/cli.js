const inquirer = require("inquirer");
const { GetEmpData, GetRoleData, GetDepData } = require("./getData.js");
const { InsertNewEmp, InsertNewRole, InsertNewDept } = require("./addData.js");
const { UpdateEmp } = require("./updateData.js");
const { generateDepNameList, generateRoleTitleList, generateFullNamesList } = require("../helper/dataConverter.js");
const renderData = require("../helper/tableFormat.js");

class CLI {
    constructor() {
        this.action = "";
        this.properties = "";
    }

    run() {
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "action",
                    message: "What would you like to do?",
                    choices: ["View All Employees",
                        "Add Employee",
                        "Update Employee Role",
                        new inquirer.Separator(),
                        "View All Roles",
                        "Add Role",
                        new inquirer.Separator(),
                        "View All Departments",
                        "Add Department",
                        new inquirer.Separator(),
                        "Quit",
                        new inquirer.Separator()
                    ]
                },
            ])
            .then(async (answer) => {

                //console.log(answer);

                switch (answer.action) {
                    case "View All Employees":
                        try {
                            await new GetEmpData().queryAllDetails().then((result) => { renderData(result) });
                        }
                        catch (err) {
                            console.error("err: " + err);
                        }
                        this.run();
                        break;
                    case "Add Employee":
                        this.AddNewEmp();
                        break;
                    case "Update Employee Role":
                        this.UpdateEmpRole();
                        // try {
                        //     await new UpdateEmp("role_id = 5", 15).update();
                        // }
                        // catch (err) {
                        //     console.error("err: " + err);
                        // }
                        // this.run();
                        break;
                    case "View All Roles":
                        try {
                            await new GetRoleData().queryAllDetails().then((result) => { renderData(result) });
                        }
                        catch (err) {
                            console.error("err: " + err);
                        }
                        this.run();
                        break;
                    case "Add Role":
                        this.AddNewRole();
                        break;
                    case "View All Departments":
                        try {
                            await new GetDepData().queryAll().then((result) => { renderData(result) });
                        }
                        catch (err) {
                            console.error("err: " + err);
                        }
                        this.run();
                        break;
                    case "Add Department":
                        this.AddNewDep();
                        break;
                    case "Quit":
                        process.exit();
                        break;
                    default:
                        console.log("No valid option selected");
                        this.run();
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    AddNewEmp() {
        return inquirer
            .prompt([{
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
                validate: (input) => { return (input && input.length > 1) ? true : 'Employee name must be 2 or more letters long.' }
            }, {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                validate: (input) => { return (input && input.length > 1) ? true : 'Employee name must be 2 or more letters long.' }
            }, {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: async () => { return await generateRoleTitleList() }
            }, {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: async () => { return await generateFullNamesList() }
            }
            ]).then(async (response) => {
                try {
                    //console.log(response);
                    const { firstName, lastName, role, manager } = response;
                    await new InsertNewEmp(firstName, lastName, role, manager).insert();
                }
                catch (err) {
                    console.error("err: " + err);
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.run();
            });
    }


    AddNewRole() {
        return inquirer
            .prompt([{
                type: "input",
                name: "name",
                message: "What is the name of the role?",
                validate: (input) => { return (input && input.length > 1) ? true : 'Role title must be 2 or more letters long.' }
            }, {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
                validate: (input) => { return (input && input >= 0) ? true : 'Salary amount cannot be less than nil.' }
            }, {
                type: "list",
                name: "department",
                message: "Which department does the role belong to?",
                choices: async () => { return await generateDepNameList() }
            }
            ]).then(async (response) => {
                try {
                    //console.log(response);
                    const { name, salary, department } = response;
                    await new InsertNewRole(name, salary, department).insert();
                }
                catch (e) {
                    console.error("err: " + e);
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.run();
            });
    }

    AddNewDep() {
        return inquirer
            .prompt([{
                type: "input",
                name: "newDepName",
                message: "What is the name of the department?",
                validate: (input) => { return (input && input.length > 1) ? true : 'Department name must be 2 or more letters long.' }
            }]).then(async (response) => {

                try {
                    //console.log(response.newDepName);
                    await new InsertNewDept(response.newDepName).insert();
                }
                catch (err) {
                    console.error("err: " + err);
                }

            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.run();
            });
    }

    UpdateEmpRole() {
        return inquirer
            .prompt([{
                type: "list",
                name: "employee",
                message: "Which employee's role do you want to update?",
                choices: async () => { return await generateFullNamesList() }
            }, {
                type: "list",
                name: "role",
                message: "Which role do you want to assign the selected employee?",
                choices: async () => { return await generateRoleTitleList() }
            }
            ]).then(async (response) => {
                
                try {
                    //console.log(response.newDepName);
                    const { employee, role } = response;
                    await new UpdateEmp(employee, role ).updateRole();
                }
                catch (err) {
                    console.error("err: " + err);
                }

            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.run();
            });
    }

}


module.exports = CLI;