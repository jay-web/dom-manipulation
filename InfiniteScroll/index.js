const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';
let container = document.getElementById("testimonials-container");
let afterId = null;
let canFetchMoreTestimonials = true;
// window.addEventListener("load", renderList)renderList()
renderList()

container.addEventListener("scroll", handleScroll)

function handleScroll(){
  if(!canFetchMoreTestimonials) return;
  let atBottom = (this.scrollHeight - this.scrollTop - this.clientHeight) ;
  if(atBottom > 0) return;
  renderList()
}

async function fetchData(){
  let api = new URL(API_BASE_URL);
  api.searchParams.set("limit", 5);

  if(afterId !== null){
    api.searchParams.set("after", afterId);
  }
  
  let response = await fetch(api);
  let data = await response.json();
  return data;
}

async function renderList(){
  canFetchMoreTestimonials = false;
  let {hasNext, testimonials} = await fetchData();
  let fragment = document.createDocumentFragment();
  for(let test of testimonials){
    let p = document.createElement("p");
    let node = document.createTextNode(test.message);
    p.classList.add("testimonial");
    p.append(node);
    fragment.append(p);
  }
  container.append(fragment);
  if(hasNext){
    afterId = testimonials[testimonials.length - 1].id
  }else{
    container.removeEventListener("scroll", handleScroll);
  }
  canFetchMoreTestimonials = true;
  
}