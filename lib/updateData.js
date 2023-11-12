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
    constructor(details,id){
        super(details,id);
        this.updateEmp = `UPDATE employee SET ${details} WHERE employee.id = ${id}`;
    }
    
    update(){
        return dbUpdate(this.updateEmp);
    }
}

//new UpdateEmp('role_id = 4',13).update();


module.exports = {UpdateEmp};