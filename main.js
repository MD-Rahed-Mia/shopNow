


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
    if (currRange > data1.length) {
      featureItems.innerHTML = `
        <h1>NO more products</h1>
      `
      nextBtn.disabled = true;
      pageN = 1;
      previousBtn.disabled = false;
    }
    if (pageN < 1) {
      previousBtn.disabled = true;
      nextBtn.disabled = false;
    }

    // display data on the webpage 

    if (index >= prevRange && index < currRange) {
      featureItems.innerHTML += data;
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


// add event on next button

nextBtn.addEventListener("click", () => {

  pageN++;
  featureProducts(pageN);
})

//add event on previos button

previousBtn.addEventListener("click", () => {

  pageN--;
  featureProducts(pageN);


})


// new arrival products goes here 
let arrivalContainer = document.querySelector(".new_arrival_container");

let arrivalPagi = document.querySelector(".arrival_pagination")


function setNewArrival(data, pr, cr) {

  let data1 = '';

  arrivalContainer.innerHTML = '';

  data.map((e, i) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="new_arrival_card">
      <img src="${e.images[0]}">
          <p>${e.title}</p>
          <p class="nac_title">${e.price}</p>
          <button class="nac_button">Buy Now!</button>
        </div>
    `;

    if (i > pr && i <= cr) {

      arrivalContainer.appendChild(div);
    }

  });


  console.log(arrivalContainer);
  console.log(data);

}


function arrivalProducts(pn) {

  let cp = pn;
  let pr = (cp-1) * 20;
  let cr = pr + 20;


  fetch("https://api.escuelajs.co/api/v1/products")
    .then(res => res.json())
    .then(data => {
      setNewArrival(data, pr, cr);
      localStorage.setItem("newArrival", JSON.stringify(data));
    })
}


//set button in the new arrival page

let tcount;
let npp = 20;

function setBtn(ind) {
  let button = document.createElement("button");
  button.innerHTML = ind;
  arrivalPagi.appendChild(button);
}

function setArrivalBtn() {
  let totalItem = localStorage.getItem('newArrival');
  let totalItemGet = JSON.parse(totalItem);

  tcount = Math.ceil(totalItemGet.length / npp);


  for (let index = 1; index <= tcount; index++) {
    
    setBtn(index);
    
  }
  console.log(tcount);
}



//call api when load in done


window.addEventListener("load", () => {
  featureProducts(1);
  arrivalProducts(1);
  setArrivalBtn();

  let arbtn = document.querySelectorAll(".arrival_pagination button");

  arbtn.forEach((e, i) => {
    e.addEventListener("click", () => {
      let vl = e.textContent;
      arrivalProducts(vl)
    })
  })


})

