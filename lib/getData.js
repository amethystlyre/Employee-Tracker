const db = require('./connectDB.js');

const dbQuery = (sql) => {
    return db.promise()
        .query(sql)
        .then(([rows, fields]) => {
            //console.table(rows);
            //console.log(rows);    
            return rows;
        }).catch((err) => {
            console.log(err.code);
            console.log(err.sqlMessage);
        });
};


class GetData {
    constructor(table) {
        this.table = table;
        this.queryAllSql = `SELECT * FROM ${table}`;
    }

    queryAll() {
        return dbQuery(this.queryAllSql);
    }
}

class GetEmpData extends GetData {
    constructor() {
        super();
        this.queryAllSql = `SELECT * FROM employee`;
        this.queryDetailSql = `SELECT Team_Member.id,Team_Member.first_name, Team_Member.last_name, role.title, role.salary, department.name AS department, concat(Manager.first_name,' ', Manager.last_name) AS manager FROM employee AS Team_Member LEFT JOIN role ON Team_Member.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS Manager ON Team_Member.manager_id = Manager.id;`
        this.queryByManagerId = ``;
        this.queryFullNameChoices = `SELECT id AS value, concat(first_name,' ', last_name) AS name FROM employee`;
    }


    queryAllDetails() {
        return dbQuery(this.queryDetailSql);
    }

    queryByManager(managerId) {
        this.queryByManagerId = `SELECT Team_Member.id, Team_Member.first_name,Team_Member.last_name, concat(Manager.first_name,' ', Manager.last_name) AS Manager FROM employee AS Team_Member LEFT JOIN employee AS Manager ON Team_Member.manager_id = Manager.id WHERE Team_Member.manager_id = ${managerId};`
        return dbQuery(this.queryByManagerId);
    }

    queryByDep(depId) {
        this.queryByDepId = `SELECT employee.id,employee.first_name, employee.last_name, role.title, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${depId};`
        return dbQuery(this.queryByDepId);
    }

    queryFullNamesList() {
        return dbQuery(this.queryFullNameChoices);
    }
}

class GetRoleData extends GetData {
    constructor() {
        super();
        this.queryAllSql = `SELECT * FROM role`
        this.queryDetailSql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
        this.titleChoices = `SELECT id AS value, title AS name FROM role`;
    }

    queryAllDetails() {
        return dbQuery(this.queryDetailSql);
    }

    queryRoleTitleList() {
        return dbQuery(this.titleChoices);
    }

}

class GetDepData extends GetData {
    constructor() {
        super();
        this.queryAllSql = `SELECT * FROM department`;
        this.queryChoices = `SELECT id AS value, name AS name FROM department`
    }

    queryDepNameList() {
        return dbQuery(this.queryChoices);
    }

    queryDepBudget(depId) {
        this.queryDepSalaryTotal = `SELECT department.name As Department,SUM(role.salary) AS 'Budget utilized' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${depId};`;
        return dbQuery(this.queryDepSalaryTotal);
    }

}

//new GetEmpData().queryByDep(1).then((result)=>console.table(result));
//new GetEmpData().queryAllDetails();
//new GetEmpData().queryByManager(1);
//new GetRoleData().queryAllDetails();
//new GetDepData().queryAll();



module.exports = { GetEmpData, GetRoleData, GetDepData };

