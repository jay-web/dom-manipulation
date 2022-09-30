
const BASE_URL = "https://dummyjson.com/products/search?";

const suggestionsList = document.getElementById("suggestions-list");
const input = document.getElementById("typeahead");
let timerId;

input.addEventListener("input", fetchData);

async function fetchData(){
 
  if(input.value.length == 0){
    clearLists()
    return;
  }
  clearTimeout(timerId);

  timerId = setTimeout(async () => {
    console.log("i have been called")
    let url = new URL(BASE_URL);
    url.searchParams.set("q", input.value);
    let response = await fetch(url);
    let {products} = await response.json();
    let fragment = document.createDocumentFragment();
    console.log(products)
    products.forEach((product) => {
      fragment.append(showData(product));
    });
    suggestionsList.replaceChildren(fragment);
  }, 500);
}

function clearLists(){
  clearTimeout(timerId);
  suggestionsList.innerHTML = "";
}

function showData(product){
  let li = document.createElement("li");
  li.textContent = product.title;
  li.addEventListener("click", () => {
    input.value = product.title;
    clearLists();
  })
  return li;
}
