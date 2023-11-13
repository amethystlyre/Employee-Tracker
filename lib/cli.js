//Import modules
const inquirer = require("inquirer");
const { GetEmpData, GetRoleData, GetDepData } = require("./getData.js");
const { InsertNewEmp, InsertNewRole, InsertNewDept } = require("./addData.js");
const { UpdateEmp } = require("./updateData.js");
const { DeleteEmp, DeleteRole, DeleteDep } = require("./deleteData.js");
const { generateDepNameList, generateRoleTitleList, generateFullNamesList } = require("../helper/dataConverter.js");
const renderData = require("../helper/tableFormat.js");

class CLI {
    constructor() {}

    run() {
        //initialize action options in the menu
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "action",
                    message: "What would you like to do?",
                    choices: ["View All Employees",
                        "View Employees By Manager",
                        "View Employees By Department",
                        "Add Employee",
                        "Update Employee Role",
                        "Delete Employee",
                        new inquirer.Separator(),
                        "View All Roles",
                        "Add Role",
                        "Delete Role",
                        new inquirer.Separator(),
                        "View All Departments",
                        "View Department's Total Utilized Budget",
                        "Add Department",
                        "Delete Department",
                        new inquirer.Separator(),
                        "Quit",
                        new inquirer.Separator()
                    ]
                },
            ])
            .then(async (answer) => {

                //console.log(answer);
                //Switch statement based user selected response from list of menue options.
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
                    case "View Employees By Manager":
                        this.viewEmpByManager();
                        break;
                    case "View Employees By Department":
                        this.viewEmpByDep();
                        break;
                    case "Add Employee":
                        this.addNewEmp();
                        break;
                    case "Update Employee Role":
                        this.updateEmpRole();
                        break;
                    case "Delete Employee":
                        this.deleteEmp();
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
                        this.addNewRole();
                        break;
                    case "Delete Role":
                        this.deleteRole();
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
                    case "View Department's Total Utilized Budget":
                        this.viewDepBudget();
                        break;
                    case "Add Department":
                        this.addNewDep();
                        break;
                    case "Delete Department":
                        this.deleteDep();
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

    //Follow on questions when adding a new employee.
    addNewEmp() {
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
                    //Insert new employee details into the DB
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

    //Follow on questions when adding a new role.
    addNewRole() {
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
                    //Insert new role details into the DB
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
    //Follow on questions when adding a new department.
    addNewDep() {
        return inquirer
            .prompt([{
                type: "input",
                name: "newDepName",
                message: "What is the name of the department?",
                validate: (input) => { return (input && input.length > 1) ? true : 'Department name must be 2 or more letters long.' }
            }]).then(async (response) => {

                try {
                    //console.log(response.newDepName);
                    //Insert new department details into the DB
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

    //Follow on questions when updating employee roles.
    updateEmpRole() {
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
                    //update selected new role details into employee table
                    const { employee, role } = response;
                    await new UpdateEmp(employee, role).updateRole();
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

    //Get employee data by manager selection
    viewEmpByManager() {
        return inquirer
            .prompt([{
                type: "list",
                name: "manager",
                message: "Which manager do you want to report on?",
                choices: async () => { return await generateFullNamesList() }
            }]).then(async (response) => {

                try {
                    //get data from db
                    await new GetEmpData().queryByManager(response.manager).then((result) => { renderData(result) });
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

    //Get employee data by department selection
    viewEmpByDep() {
        return inquirer
            .prompt([{
                type: "list",
                name: "department",
                message: "Which department do you want to report on?",
                choices: async () => { return await generateDepNameList() }
            }]).then(async (response) => {

                try {
                    //get data from db
                    await new GetEmpData().queryByDep(response.department).then((result) => { renderData(result) });
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

    //Get total employee salary data by department selection
    viewDepBudget() {
        return inquirer
            .prompt([{
                type: "list",
                name: "department",
                message: "Which department do you want to report on?",
                choices: async () => { return await generateDepNameList() }
            }]).then(async (response) => {

                try {
                    //get data from db
                    await new GetDepData().queryDepBudget(response.department).then((result) => { renderData(result) });
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

    //Delete employee by selection
    deleteEmp() {
        return inquirer
            .prompt([{
                type: "list",
                name: "employee",
                message: "Which employee do you want to delete?",
                choices: async () => { return await generateFullNamesList() }
            }]).then(async (response) => {

                try {
                    //send delete request to DB
                    await new DeleteEmp(response.employee).delete();
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

    //Delete role by selection
    deleteRole() {
        return inquirer
            .prompt([{
                type: "list",
                name: "role",
                message: "Which role do you want to delete?",
                choices: async () => { return await generateRoleTitleList() }
            }]).then(async (response) => {

                try {
                    //send delete request to DB
                    await new DeleteRole(response.role).delete();
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

    //Delete department by selection
    deleteDep() {
        return inquirer
            .prompt([{
                type: "list",
                name: "department",
                message: "Which department do you want to delete?",
                choices: async () => { return await generateDepNameList() }
            }]).then(async (response) => {

                try {
                    //send delete request to DB
                    await new DeleteDep(response.department).delete();
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