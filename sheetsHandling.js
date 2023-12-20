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
    createSheetDB();
})

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
    collectedSheetDB(sheetDB);

}