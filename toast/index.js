const message = document.getElementById("message-content");

const cancelable = document.getElementById("cancelable");
const toastType = document.getElementsByName("type");

const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const listOfToasts = document.getElementById("toasts");
const MIN_DURATION = 500;

function addToast() {
  let div = createToast();
  listOfToasts.prepend(div);
  setTimeout(() => {
    div.remove();
  }, getDuration());
}

function createToast(){
  let div = document.createElement("div");
  let type = setType();
  let className = type == "success" ? "success-toast" : "error-toast";
  let defaultMessage = type == "success" ? "Success!" : "Error.";
  div.classList.add("toast");
  div.classList.add(className);
  let p = document.createElement("p");
  let textNodeP = document.createTextNode(message.value || defaultMessage);
  p.classList.add("message");
  p.appendChild(textNodeP);
  div.appendChild(p);
  let button = document.createElement("button");
  button.classList.add("cancel-button");
  if(cancelable.checked == true){
     button.textContent = "X";
    div.appendChild(button);
    button.addEventListener("click", () => {
      div.remove()
       
    })
  }
   
  
 
  return div;
}

function setType(){
  let typeOfToast;
  toastType.forEach((type) => {
    if(type.checked){
      typeOfToast = type.value;
    }
  });
  return typeOfToast;
}

function getDuration(){
  const duration = parseInt(document.getElementById("duration").value);

  if(isNaN(duration) || duration < MIN_DURATION){
    return MIN_DURATION;
  }else{
    return duration;
  }
}

function removeAllToast(){
  listOfToasts.innerHTML = '';
}


addButton.addEventListener("click", addToast);
clearButton.addEventListener("click", removeAllToast);
