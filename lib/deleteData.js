const db = require('./connectDB.js');
const { GetEmpData, GetRoleData, GetDepData } = require('./getData.js');

const dbDelete = (sql) => {
    return db.promise()
        .query(sql)
        .then((result) => {
            //console.log(result);
            console.log("Deletion completed.");
        }).catch((err) => {
            console.log(err);
            console.log(err.sqlMessage);
            console.log(err.sql);
        });
};


class DeleteData {
    constructor(table, id) {
        this.deleteByID = `Delete FROM ${table} WHERE ${table}.id = ${id}`;
    }

    delete() {
        return dbDelete(this.deleteByID);
    }
}

class DeleteEmp extends DeleteData {
    constructor(id) {
        super(id);
        this.deleteByID = `Delete FROM employee WHERE employee.id = ${id}`;
    }

}

class DeleteRole extends DeleteData {
    constructor(id) {
        super(id);
        this.deleteByID = `Delete FROM role WHERE role.id = ${id}`;
    }

}

class DeleteDep extends DeleteData {
    constructor(id) {
        super(id);
        this.deleteByID = `Delete FROM department WHERE department.id = ${id}`;
    }

}

new DeleteEmp(50).delete();


module.exports = { DeleteEmp, DeleteRole, DeleteDep };