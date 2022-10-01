const suggestionsList2 = document.getElementById("throttle-suggestions-list");
const inputElement = document.getElementById("throttle");
let timerId2;
let lastTimeCalled = 0;

inputElement.addEventListener("input", fetchData);

function fetchData() {
  if (inputElement.value.length == 0) {
    clearLists(suggestionsList2, timerId2);
    return;
  }
  let delay = 2000;
  let currentTime = Date.now();
  let timeSinceLastCalled = currentTime - lastTimeCalled;
  let delayRemaining = delay - timeSinceLastCalled;

  if (delayRemaining <= 0) {
    lastTimeCalled = currentTime;
    makeApiCall();
  } else {
    clearTimeout(timerId2);
    timerId2 = setTimeout(() => {
      lastTimeCalled = Date.now();
      makeApiCall();
    }, delayRemaining);
  }
}

async function makeApiCall() {
  let url = new URL(BASE_URL);
  url.searchParams.set("q", inputElement.value);
  let response = await fetch(url);
  let { products } = await response.json();
  let fragment = document.createDocumentFragment();

  products.forEach((product) => {
    fragment.append(
      showData(product, suggestionsList2, timerId2, inputElement)
    );
  });
  suggestionsList2.replaceChildren(fragment);
}
