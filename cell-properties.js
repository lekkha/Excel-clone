//storage
let sheetDB = [];
for(let i=0; i<rows; i++){
    let sheetRow = []; 
    for(let j=0; j<cols; j++){
        let cellProp ={
            bold: false,
            italic: false,
            undeline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize:"14",
            fontColor: "#000000",
            BGcolor: "#000000"

        }
        sheetRow.push(cellProp); 
    }
    sheetDB.push(sheetRow);
} 

//Selectors for cell properties 
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let leftAlign = alignment[0]; 
let rightAlign = alignment[1];
let centerAlign = alignment[2]; 

//color prop
let activeColorProp = "#d1dBe0"; 
let inactiveColorProp = "#ecf0f1";

//Application of two-way binding 

//Attach property listener 
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]= activeCell(address); 

    //modifications
    cellProp.bold = !cellProp.bold; 
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; 
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;

})

//accessing cell and stroge
function activeCell(address){
    let [rid, cid] = decodeRIDCIDFromAddress(address); 
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid]; 
    return [cell,cellProp];
}

function decodeRIDCIDFromAddress(address){
    //"A1" -> 00 [it is recived as string convert to number]
    let rid = Number(address.slice(1)-1);  // "1"->0 
    let cid = Number(address.charCodeAt(0)) -65; //"A" ->0
    return [rid,cid]; 
}
 
