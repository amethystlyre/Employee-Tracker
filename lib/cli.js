const inquirer = require("inquirer");
const {GetEmpData,GetRoleData,GetDepData} = require("./getData.js");
const {InsertNewEmp,InsertNewRole,InsertNewDept} = require("./addData.js");
const {UpdateEmp} = require("./updateData.js");

class CLI{
    constructor(){
        this.action="";
        this.properties="";
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
                            "Quit"
                        ]
                },
                ])
        .then(async (answer)=>{

            console.log(answer);

            switch(answer.action){
                case "View All Employees":
                    try{
                        await new GetEmpData().queryAllDetails();
                    }
                    catch (e){
                        console.error("err: "+e);
                    }
                    this.run();
                    break;
                case "Add Employee":                    
                    try{
                        await new InsertNewEmp("test","test",3,1).insert();
                    }
                    catch (e){
                        console.error("err: "+e);
                    }
                    this.run();
                    break;
                case "Update Employee Role":
                    try{
                        await new UpdateEmp("role_id = 5",15).update();
                    }
                    catch (e){
                        console.error("err: "+e);
                    }
                    this.run();
                    break;
                case "View All Roles":
                    try{
                        await new GetRoleData().queryAllDetails();
                    }
                    catch (e){
                        console.error("err: "+e);
                    }
                    this.run();                    
                    break;
                case "Add Role":
                    try{
                        await new InsertNewRole("Regional Account Manager",180000,3).insert();
                    }
                    catch (e){
                        console.error("err: "+e);
                    }
                    this.run(); 
                    break;
                case "View All Departments":
                    try{
                        await new GetDepData().queryAll();
                    }
                    catch (e){
                        console.error("err: "+e);
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
        // .then(()=>{
            
        // })
        .catch();
    }

    AddNewEmp() {
        return inquirer
        .prompt([{
            type: "input",
            name: "action",
            message: "What is the employee's first name?",
        },{
            type: "input",
            name: "action",
            message: "What is the employee's last name?",
        },{
            type: "list",
            name: "action",
            message: "What is the employee's role?",
        },{
            type: "list",
            name: "action",
            message: "Who is the employee's manager?",
        }
        ]).then()
    }


    AddNewRole() {
        return inquirer
        .prompt([{
            type: "input",
            name: "action",
            message: "What is the name of the role?",
        },{
            type: "input",
            name: "action",
            message: "What is the salary of the role?",
        },{
            type: "list",
            name: "action",
            message: "Which department does the role belong to?",
            choices: []
        }
    ])
    }

    AddNewDep(){
        return inquirer
        .prompt([{
            type: "input",
            name: "newDepName",
            message: "What is the name of the department?",
        }]).then(async (response)=>{

            try {
                console.log(response.newDepName);
                await new InsertNewDept(response.newDepName).insert();
            }
            catch (e) {
                console.error("err: " + e);
            }
            
        }).catch((err)=>{
            console.log(err);
        }).then(()=>{
            this.run();
        });
    }
}


module.exports = CLI;