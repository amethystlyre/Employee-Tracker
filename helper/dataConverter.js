const {GetEmpData,GetRoleData,GetDepData} = require("../lib/getData");

const generateDepNameList = async function(){

    try{
        let data = await new GetDepData().queryDepChoices();
        console.log(data);
        return data;
    }
    catch (e){
        console.error("err: "+e);
    }
}


const generateRoleTitleList = async function(){
    try{
        let data = await new GetRoleData().queryAll();
        let roleTitles = [];
        data.forEach(element => {
            let choice = {value:"",name:""}
            choice.value=element.id;
            choice.name=element.name;
            roleTitles.push(choice);
        });
        //console.log(roletitle);
        return roleTitles;
    }
    catch (e){
        console.error("err: "+e);
    }
}

//generateDepNameList();



module.exports = {generateDepNameList,generateRoleTitleList};