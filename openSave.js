let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");


//download task
downloadBtn.addEventListener("click", (e) => {

    //convert json to data
    let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
    //make a file 
    let file = new Blob([jsonData], { type: "application/json" });
    
    //create anchor element
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file); //create url 
    a.download = "SheetData.json"; //name the file that will be downloaded
    a.click(); //click the anchor 
})

//open/upload 
// Open task (upload)
openBtn.addEventListener("click", (e) => {

   // Opens file explorer - so that one can select file to be uploaded 
   let input = document.createElement("input");
   input.setAttribute("type", "file");
   input.click();

   input.addEventListener("change", (e) => {
    let fr = new FileReader();
    let files = input.files;
    let fileObj = files[0];

    fr.readAsText(fileObj);
    fr.addEventListener("load", (e) => {
        let readSheetData = JSON.parse(fr.result);

        // Basic sheet with default data will be created
        addSheetBtn.click();

        // SheetDB, graphComponent
        sheetDB = readSheetData[0];
        graphComponentMatrix = readSheetData[1];

        //modified data in main collections
        collectedSheetDB[collectedSheetDB.length-1] = sheetDB;
        collectedGraphComponent[collectedGraphComponent.length-1] = graphComponentMatrix;

        handleSheetProperties();

    })

   })
})