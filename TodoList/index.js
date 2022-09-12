// Write your code here.
const input = document.getElementById("todo-input");
const add = document.getElementById("add-button");
const list = document.getElementById("todo-list");
let text = "";

add.addEventListener("click", addNewItem);

input.addEventListener("keypress", (event) => onTyping(event));


function onTyping(event){
    console.log(event.key == "Enter")
  if(input.value){
    add.disabled = false;
  }else{
    add.disabled = true;
  }
  text = event.target.value;
  if(event.key == "Enter"){
    addNewItem()
  }
}


function addNewItem(){
  let item = document.createElement("li");
  
  item.append(createHeading());
  item.append(createButton());
  list.append(item);
  input.value = "";
  text = "";
  add.disabled = true;
}

function removeItem(element){
  element.parentNode.remove()
}

function createButton(){
  let button = document.createElement("button")
  button.classList.add("delete-button");
  button.innerText = "X";
  button.addEventListener("click", function() {
    removeItem(this);
  });
  
  return button;
}

function createHeading(){
  let h2 = document.createElement("h2");
  let node = document.createTextNode(text);
  h2.append(node);
  return h2;
}



