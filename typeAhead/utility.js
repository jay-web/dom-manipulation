
const BASE_URL=  "https://dummyjson.com/products/search?";

function clearLists(ulList, timerId) {
  clearTimeout(timerId);
  ulList.innerHTML = "";
}

function showData(product, ulList, timerId, inputElement) {
  let li = document.createElement("li");
  li.textContent = product.title;
  li.addEventListener("click", () => {
    inputElement.value = product.title;
    clearLists(ulList, timerId);
  });
  return li;
}

