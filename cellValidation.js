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


//true->cycle false-> not cyclic 
//gives reponse 
function isGraphCyclic(graphComponentMatrix){
    let visited = [];  //Node visit trace 
    let dfsVisited = []; //Stack visit trace

    //storage in 2D form since -> nodes in 2d form cell=[rid][cid] also cell->[[child1],[child2]]//storagematrix 2d hai

    //step 1 to all nodes set false in visited and dfsVisited
    for(let i=0; i<rows; i++){
        let visitedRow = []; 
        let dfsVisitedRow = []; 
        for(let j=0; j<cols; j++){
        //26 false in every row 
        visitedRow.push(false); 
        dfsVisitedRow.push(false);
        }
        visited.push(visitedRow); 
        dfsVisited.push(dfsVisitedRow);
    }

    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            if(visited[i][j] === false){
                let response =  dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                //cycle detected, no need to exp further
                if(response === true ) return [i,j];
                //return i,j --> source point of cycle formation --> to begiven to cycPthTr  

            }

        }
    }

    return null; 
}

//detects cycle

//START -> vis(TRUE) , dfsVis(TRUE)
//END -> dfsVis(False) [remove from stack]
//if vis[i][j] -> already visited path , so go back , no use of explr again 
//cycle detection condition -> if(vis[i][j]== true and dfsVis[i][j] == true)-> cycle 
//srcc,srcr gives acess to cell 
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited){
    visited[srcr][srcc] = true; 
    dfsVisited[srcr][srcc] = true; 

    //A1 -> [[0,1], [1,0], [5,10], ...]

    //checking graph connection at every child 
    for(let children=0; children< graphComponentMatrix[srcr][srcc].length; children++){
        let [nbrr , nbrc] = graphComponentMatrix[srcr][srcc][children];
        //go fw only if vis(false)
        if(visited[nbrr][nbrc] === false){
            //recursively go to its children thus like this till the last node 
            let response = dfsCycleDetection(graphComponentMatrix,nbrr,nbrc,visited,dfsVisited); 
            if(response === true) return true; //cycle detected, no need to exp further
        }
        
        //main formula for cycle detedctio
        else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true){
            return true; //cycle detected, no need to exp further 
        }
    }

    dfsVisited[srcr][srcc] = false; 
    return false; 

}