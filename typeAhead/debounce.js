const suggestionsList = document.getElementById("debounce-suggestions-list");
const input = document.getElementById("debounce");
let timerId;

input.addEventListener("input", fetchData);

async function fetchData() {
  if (input.value.length == 0) {
    clearLists(suggestionsList, timerId);
    return;
  }
  clearTimeout(timerId);

  timerId = setTimeout(async () => {
    let url = new URL(BASE_URL);
    url.searchParams.set("q", input.value);
    let response = await fetch(url);
    let { products } = await response.json();
    let fragment = document.createDocumentFragment();

    products.forEach((product) => {
      fragment.append(showData(product, suggestionsList, timerId, input));
    });
    suggestionsList.replaceChildren(fragment);
  }, 500);
}
