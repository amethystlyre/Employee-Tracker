const { GetEmpData, GetRoleData, GetDepData } = require("../lib/getData");

//Helper function to generate a list of department names and values(ID) as choices for user to select
const generateDepNameList = async function () {

    try {
        let data = await new GetDepData().queryDepNameList();
        //console.log(data);
        return data;
    }
    catch (e) {
        console.error("err: " + e);
    }
}

//Helper function to generate a list of role titles and values(ID) as choices for user to select
const generateRoleTitleList = async function () {
    try {
        let data = await new GetRoleData().queryRoleTitleList();
        //console.log(data);
        return data;
    }
    catch (e) {
        console.error("err: " + e);
    }
}


//Helper function to generate a list of employee full names and values(ID) as choices for user to select
const generateFullNamesList = async function () {

    try {
        let data = await new GetEmpData().queryFullNamesList();
        //console.log(data);
        return data;
    }
    catch (e) {
        console.error("err: " + e);
    }
}

//generateDepNameList();

//generateRoleTitleList();

module.exports = { generateDepNameList, generateRoleTitleList, generateFullNamesList };