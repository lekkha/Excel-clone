//blur event 

for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e)=> {
            let address = addressBar.value; 
            let[activecell , cellProp] = getCellAndCellProp(address); 
            let enteredData = activecell.innerText;

            //if value not changed simply return
            if(enteredData === cellProp.value) return; 

            cellProp.value = enteredData; 
            ///otherwise mandatory procedure is 
            //if cell value modified remove PC rel , formula empty ,update children with new modified value 
            removeChildParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);

        })
    }
}

//get formula bar 
let formulaBar = document.querySelector(".function-bar"); 
formulaBar.addEventListener("keydown", async (e) => {
    let inputFormula = formulaBar.value; //string that contians formula 
    if(e.key === "Enter" && inputFormula) {

        //checking if the inputformula was changed in between --- if yes remove the relation and 
        //establish new relationship
        let address = addressBar.value; 
        let[cell,cellProp] = getCellAndCellProp(address); 
        //inputFormula -> changed formula 
        //cellProp.formula -> old formula that was present under cell properties
        if(inputFormula !== cellProp.formula) removeChildParent(cellProp.formula); 
        //old formula given in RCP() so that old P-C rel can be traced

        addChildToGraphComponent(inputFormula,address); 
        //Check formula is cyclic or not then only evaluate 
        //true->cycle false-> not cyclic
        let cycleResponse = isGraphCyclic(graphComponentMatrix);

        if(cycleResponse){
            // alert("Your Formula is Cyclic");

            let response = confirm("Your formula is cyclic. Do you want to trace your path?");
            while(response === true){
                //keep on tracking till user is satisfied
                await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse); //attaching await here as well so that full iteration of color-tracking can be seen 
                response = confirm("Your formula is cyclic. Do you want to trace your path?");

            }
            
         
            //if cycle detected break relationship 
            removeChildFromGraphComponent(inputFormula,address);
            return; 
        }

        let evaluatedValue = evaluateFormula(inputFormula); 

        //after this update db and ui 
        setCellUIandCellProp(evaluatedValue, inputFormula, address); 
        addChildToParent(inputFormula); 
        updateChildrenCells(address);
    }
})

//formula -> PCR  //childAddress -> since it has to be decoded 
function addChildToGraphComponent(formula, childAddress){
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress); 
    let encodedFormula = formula.split(" "); 
    for(let i=0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0); 
        if(asciiValue>=65 && asciiValue<=90){
            let [prid,pcid] = decodeRIDCIDFromAddress(encodedFormula[i]); 
            graphComponentMatrix[prid][pcid].push([crid,ccid]); 
        }
    }  

}

function removeChildFromGraphComponent(formula, childAddress){
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress); 
    let encodedFormula = formula.split(" ");
    for(let i=0; i< encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0); 
        if(asciiValue>=65 && asciiValue<=90){
            let[prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]); 
            //ek formula ko add karte hi relation estb hua tha -- pop last wale ko hi del kardeta hai 
            graphComponentMatrix[prid][pcid].pop(); 
        }
    }

}

function updateChildrenCells(parentAddress){
    let [parentCell,parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children; 

    for(let i=0; i<children.length; i++){
        let childAdress = children[i]; 
        let [childCell , childCellProp] = getCellAndCellProp(childAdress);
        let childFormula = childCellProp.formula; 

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIandCellProp(evaluatedValue, childFormula, childAdress);

        //b1 ke children ke liey recursion 
        updateChildrenCells(childAdress);


    }

}

function addChildToParent(formula){
    let childAdress = addressBar.value; 
    let encodedFormula = formula.split(" "); 
    for(let i=0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0); 
        if(asciiValue>=65 && asciiValue<=90){
            let [parentCell , parentCellProp] = getCellAndCellProp(encodedFormula[i]); 
            parentCellProp.children.push(childAdress);   
        }
    }
}

function removeChildParent(formula){
    let childAdress = addressBar.value; 
    let encodedFormula = formula.split(" "); 
    for(let i=0; i<encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0); 
        if(asciiValue>=65 && asciiValue<=90){
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]); 
            let idx = parentCellProp.children.indexOf(childAdress);
            parentCellProp.children.splice(idx,1);
        }
    }

}

function evaluateFormula(formula){
    let encodedFormula = formula.split(" "); 

    for(let i=0; i< encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0); 
        if(asciiValue>=65 && asciiValue<= 90){
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]); 
            encodedFormula[i] = cellProp.value; //at the place of 'A1' -> write say 10
        }
    }
    //eval takes string to converting encodedFormula array to string
    let decodedFormula = encodedFormula.join(" "); 
    return eval(decodedFormula);
}

function setCellUIandCellProp(evaluatedValue,formula, address){

    let [cell, cellProp] = getCellAndCellProp(address); 

    //UI 
    cell.innerText = evaluatedValue;

    //db
    cellProp.value = evaluatedValue; //since now the value of the cell is the evaluatedValue
    cellProp.formula = formula; 

}