let items = document.querySelectorAll(".item");
let dropZones = document.querySelectorAll(".drop-zone");

let draggedItem;

items.forEach((item) => {
    item.addEventListener("dragstart", dragItem);
    item.addEventListener("dblclick", onDoubleClickOnItem);
});

dropZones.forEach((dropZone) => {
    dropZone.addEventListener("drop", onDropOverDropZone);
    dropZone.addEventListener("dragover", onDragOverDropZone);
});

function dragItem(event){
    draggedItem = event.target;
    console.log(draggedItem)
}


function onDropOverDropZone(){
    if(this !== draggedItem.parentNode){
        this.appendChild(draggedItem);
    }
}

function onDragOverDropZone(event){
    event.preventDefault()
}

function onDoubleClickOnItem(){
    let unRankedDropZone = document.getElementById("unranked-drop-zone");
   if(unRankedDropZone !== this.parentNode){
      unRankedDropZone.appendChild(this)
   }
   
}

