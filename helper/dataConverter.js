const {GetEmpData,GetRoleData,GetDepData} = require("../lib/getData");

const generateDepNameList = async function(){

    try{
        let data = await new GetDepData().queryDepNameList();
        //console.log(data);
        return data;
    }
    catch (e){
        console.error("err: "+e);
    }
}


const generateRoleTitleList = async function(){
    try{
        let data = await new GetRoleData().queryRoleTitleList();
        //console.log(data);
        return data;
    }
    catch (e){
        console.error("err: "+e);
    }
}

const generateFullNamesList = async function(){

    try{
        let data = await new GetEmpData().queryFullNamesList();
        //console.log(data);
        return data;
    }
    catch (e){
        console.error("err: "+e);
    }
}

//generateDepNameList();

//generateRoleTitleList();

module.exports = {generateDepNameList,generateRoleTitleList,generateFullNamesList};