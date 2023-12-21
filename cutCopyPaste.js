let ctrlKey; 

document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey; //pressed
})

document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey; //not pressed
})

//sotoring range cells 

//all cells access
for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handelSelectedCells(cell); 
    }
}

let rangeStorage = [];
function handelSelectedCells(cell){

    //add a click listner to selected cell
    cell.addEventListener("click", (e) =>{
        if(!ctrlKey) return; 

        if(rangeStorage.length >= 2){
            defaultSelectedCellsUI(); 
            rangeStorage=[]; //empty range storage
        }
        
        //UI
        cell.style.border = "3px solid #218c74"; 

        let rid = Number(cell.getAttribute("rid")); 
        let cid = Number(cell.getAttribute("cid"));

        rangeStorage.push([rid,cid]); 
    })
}

function defaultSelectedCellsUI(){
    for(let i=0; i< rangeStorage.length ; i++){
        //extracting rid and cid of the particular cell in rangeStorage
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";
    }
}