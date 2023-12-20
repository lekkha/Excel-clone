let activeSheetColor  ="#ced6e0";

let sheetFolderContainer = document.querySelector(".sheets-folder-cont");
let addSheetButton = document.querySelector(".sheet-add-icon");
addSheetButton.addEventListener("click", (e) => {

    //creating sheet dynamically 
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolder.length);

    sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allSheetFolder.length + 1}</div>
    `;

    sheetFolderContainer.appendChild(sheet);
    //DB
    createSheetDB();
    createGraphComponentMatrix();

    handelSheetActiveness(sheet);
    handelSheetRemoval(sheet);
    sheet.click();
})

function handelSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e) => {
        //right click  0-lt , 1-center, 2- right
        if(e.button !== 2) return; 

        let allSheetFolder = document.querySelectorAll(".sheet-folder"); 
        if(allSheetFolder.length === 1){
            alert("You need to have atleast 1 sheet!!");
            return; 
        }

        let response = confirm("Your sheet will be deleted permanently. Are you sure?")
        if(response === false) return; 

        let sheetIdx = Number(sheet.getAttribute("id")); 
        collectedSheetDB.splice(sheetIdx, 1); 
        collectedGraphComponent.splice(sheetIdx, 1); 

        //remove ui 
        handleSheetUIRemoval(sheet)

        //by default sheetDB to sheet1 (active)
        sheetDB = collectedSheetDB[0]; 
        graphComponentMatrix = collectedGraphComponent[0]; 
        handelSheetProperties(); 
        
    })
}

function handleSheetUIRemoval(sheet) {
    sheet.remove();
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for (let i = 0;i < allSheetFolder.length;i++) {
        allSheetFolder[i].setAttribute("id", i);
        let sheetContent = allSheetFolder[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet ${i+1}`;
        allSheetFolder[i].style.backgroundColor = "transparent";
    }

    allSheetFolder[0].style.backgroundColor = activeSheetColor;
}

function handelSheetDB(sheetIdx) {
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handelSheetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    //by default click on first cell via DOM
    let firstCell = document.querySelector(".cell");
    firstCell.click(); //internally clicked through dom

}

function handelSheetUI(sheet){
    let allSheetFolder = document.querySelectorAll(".sheet-folder"); 
    for(let i=0; i<allSheetFolder.length; i++){
        allSheetFolder[i].style.backgroundColor = "transparent"; 
    }
    sheet.style.backgroundColor = activeSheetColor; 
}

function handelSheetActiveness(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handelSheetDB(sheetIdx);
        //function made active by sheet.click()
        // rn now work only under EVENTLISTNER  
        handelSheetProperties(); 
        handelSheetUI(sheet); 
        
    })
}

function createSheetDB() {
    let sheetDB = [];
    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < cols; j++) {
            let cellProp = {
                bold: false,
                italic: false,
                undeline: false,
                alignment: "left",
                fontFamily: "monospace",
                fontSize: "14",
                fontColor: "#000000",
                BGcolor: "#000000",
                value: "",
                formula: "",
                children: [],

            }
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
    let graphComponentMatrix = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            //why array -> more than 1 child dependencies can be present 
            row.push([]);
        }
        graphComponentMatrix.push(row)
    }
    collectedGraphComponent.push(graphComponentMatrix);
}