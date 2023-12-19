//storage 2D matrix(basic structure)

let graphComponentMatrix = []; 

for(let i=0; i<rows; i++){
    let row = []; 
    for(let j=0; j<cols; j++){
        //why array -> more than 1 child dependencies can be present 
        row.push([]); 
    }
    graphComponentMatrix.push(row)
}