const db = require('./connectDB.js');
const {GetEmpData,GetRoleData,GetDepData} = require('./getData.js');

const dbUpdate = (sql) => {        
    return db.promise()
    .query(sql)
    .then((result)=>{
        if (result[0].changedRows == 1){
            console.log(`One record has been updated successfully.`);
        }
        else{
            console.log(`Could not find the record id to update.`);
        }
    //console.log(result);
    }).catch((err)=>{
    console.log(err.code);
    console.log(err.sqlMessage);
    console.log(err.sql);});
    };


class UpdateData{
    constructor(table,details,id){
        this.updateID = `UPDATE ${table} SET ${details} WHERE employee.id = ${id}`;
    }
    
    update(){
        return dbUpdate(this.updateID);
    }
}

class UpdateEmp extends UpdateData{
    constructor(employeeID,newRoleID){
        super();
        this.updateEmpRole = `UPDATE employee SET role_id = ${newRoleID} WHERE employee.id = ${employeeID}`;
    }
    
    updateRole(){
        return dbUpdate(this.updateEmpRole);
    }
}

//new UpdateEmp('role_id = 4',13).update();


module.exports = {UpdateEmp};