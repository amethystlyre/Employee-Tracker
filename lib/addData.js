//Import modules
const db = require('./connectDB.js');
//const { GetEmpData, GetRoleData, GetDepData } = require('./getData.js');

//Insert data using promise
const dbInsert = (sql) => {
    return db.promise()
        .query(sql)
        .then((result) => {
            console.log(`A new record has been added. ID is ${result[0].insertId}.`);
            //console.log(result[0].insertId);
            //console.log(result[0]);
        }).catch((err) => {
            console.log(err.code);
            console.log(err.sqlMessage);
            console.log(err.sql);
        });
};

//Generic Insert class
class InsertData {
    constructor(table, columnNames, columnVals) {
        this.table = table;
        this.insertNew = `INSERT INTO ${table} (${columnNames})
        VALUES (${columnVals})`;
    }

    insert() {
        return dbInsert(this.insertNew);
    }
}

//SQL statements for inserting employee data
class InsertNewEmp extends InsertData {
    constructor(firstName, lastName, roleID, managerID) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
        this.insertNewEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${this.firstName}', '${this.lastName}', ${this.roleID},${this.managerID});`;
    }
    insert() {
        return dbInsert(this.insertNewEmp);
    }
}

//SQL statements for inserting role data
class InsertNewRole extends InsertData {
    constructor(title, salary, department_id) {
        super();
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
        this.insertNewRole = `INSERT INTO role (title, salary,department_id) VALUES ('${this.title}', '${this.salary}', ${this.department_id});`;

    }

    insert() {
        return dbInsert(this.insertNewRole);
    }
}

//SQL statements for inserting department data
class InsertNewDept extends InsertData {
    constructor(deptName) {
        super();
        this.name = deptName;
        this.insertNewDept = `INSERT INTO department (name) VALUES ('${this.name}');`;
    }

    insert() {
        return dbInsert(this.insertNewDept);
    }

}

//new InsertNewEmp('test','test',3,1).insert();
//new InsertNewRole('Regional Account Manager',180000,3).insert();
//new InsertNewDept('Customer Support').insert();


module.exports = { InsertNewEmp, InsertNewRole, InsertNewDept };

