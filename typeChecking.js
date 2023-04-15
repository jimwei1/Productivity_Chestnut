function typeCheck(variable, type) {
    failTemplate = 'Variable ${Object.keys({variable})[0]} is type ${typeof variable}; should be type ${type}';
    if (typeof variable !== type){
        throw new TypeError(failTemplate);
    }
    return true;
}


function checkInputList(listOfVariables, listOfTypes){
    if (listOfTypes.length !== listOfVariables.length){
        throw new Error("List of Variables doesn't match list of Types.")
    }
    for (let i = 0; i < listOfTypes.length; ++i){
        typeCheck(listOfVariables[i], listOfTypes[i])
    }
    return true;
}
