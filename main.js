


// feature products add 
let featureItems = document.querySelector(".feature_items");
const pgContainer = document.querySelector(".feature_pro_pagi");
let nextBtn = pgContainer.querySelector("#next");
let previousBtn = pgContainer.querySelector("#previous");

let pp = 5;
let pageN = 1;
let numberOfPage;

let efA = [];




const featureProducts = async (pageN) => {
  const res = await fetch('https://fakestoreapi.com/products')
  const featurePro = await res.json();
  const data1 = await featurePro;

  console.log(data1.length);


  let prevRange = (pageN - 1) * pp;
  let currRange = prevRange + pp;





  let data = '';
  featureItems.innerHTML = '';

  featurePro.map((ele, index) => {
    data = `
        <div class="featue_card">
          <img src="${ele.image}" alt="feature prdocuct">
          <p class="fa_cat">${ele.category}</p>
          <p class="fa_title">${ele.title}</p>
          <p class="fa_price">&dollar;${ele.price}</p>
          <button class="fa_cart"><i class="fa-solid fa-cart-shopping"></i></button>
        </div>
    `;

    if (index >= prevRange && index < currRange ) {
      featureItems.innerHTML += data;
    }

    if (currRange > data1.length) {
      featureItems.innerHTML = `
        <h1>NO more products</h1>
      `
      nextBtn.disabled = true;
    }

  })
}


//add event listener on the pagination btn



//create button with js

function createBt(index) {
  let btn = document.createElement("button");
  btn.innerHTML = index;
  pgContainer.appendChild(btn);
}

//set button into the page

function generatePgBtn() {

  totalItem = 30;
  totalBtn = Math.ceil(totalItem / pp);
  
  for (let index = 1; index <= totalBtn; index++) {
    createBt(index);
  }
}


  nextBtn.addEventListener("click", () => {

      pageN++;
      featureProducts(pageN);
  })
previousBtn.addEventListener("click", () => {

  pageN--;
  featureProducts(pageN);

  if (pageN <= 1) {
    previousBtn.disabled = true;
  }
})

window.addEventListener("load", () => {
  featureProducts(1);
})

