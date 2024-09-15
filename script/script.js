const searchWorld = document.querySelector("#search-word");
const products = document.querySelectorAll(".product-items");
const searchPrice = document.querySelector("#search-price");
const searchPriceBTN = document.querySelector("#search-btn");

const BtnAll = document.querySelector("#BtnAll");
const BtnTech = document.querySelector("#BtnTech");
const BtnHealth = document.querySelector("#BtnHealth");
const BtnCloth = document.querySelector("#BtnCloth");
const addToCardBTN = document.querySelectorAll("#addToCardBTN");
const cartMessageBox = document.querySelector("#cartMessageBox");
const messageBoxItemName = document.querySelector("#messageBoxItemName");
const cartMessageBoxborde = document.querySelector("#cartMessageBoxborde");
const zanbil = document.querySelector("#zanbil");
const cart = document.querySelector("#cart");
const cartp = document.querySelector("#cart p");
const inCart = {
  item: [],
  totalPrice: 0,
};

const searchByWord = (event) => {
  btnAllClick();
  const phrase = event.target.value.toLowerCase().trim();
  products.forEach((product) => {
    if (product.children[1].innerText.toLowerCase().includes(phrase)) product.style.display = "flex";
    else product.style.display = "none";
  });
};

const searchByPriceBTN = (event) => {
  btnAllClick();
  const price = searchPrice.value;
  products.forEach((product) => {
    if (product.children[2].innerText === price) product.style.display = "flex";
    else if (price === "") product.style.display = "flex";
    else product.style.display = "none";
  });
};

const searchByPrice = (event) => {
  btnAllClick();
  const price = searchPrice.value;
  if (event.key === "Backspace" || event.key === "Enter")
    products.forEach((product) => {
      if (product.children[2].innerText === price) product.style.display = "flex";
      else if (price === "") product.style.display = "flex";
      else product.style.display = "none";
    });
};

const btnAllClick = () => {
  BtnAll.classList.add("active");
  BtnTech.classList.remove("active");
  BtnHealth.classList.remove("active");
  BtnCloth.classList.remove("active");
  products.forEach((product) => {
    product.style.display = "flex";
  });
};

const btnTechClick = () => {
  BtnAll.classList.remove("active");
  BtnTech.classList.add("active");
  BtnHealth.classList.remove("active");
  BtnCloth.classList.remove("active");
  products.forEach((product) => {
    if (product.dataset.category === "tech") product.style.display = "flex";
    else product.style.display = "none";
  });
};

const btnHealthClick = () => {
  BtnAll.classList.remove("active");
  BtnTech.classList.remove("active");
  BtnHealth.classList.add("active");
  BtnCloth.classList.remove("active");
  products.forEach((product) => {
    if (product.dataset.category === "health") product.style.display = "flex";
    else product.style.display = "none";
  });
};

const btnClothlick = () => {
  BtnAll.classList.remove("active");
  BtnTech.classList.remove("active");
  BtnHealth.classList.remove("active");
  BtnCloth.classList.add("active");
  products.forEach((product) => {
    if (product.dataset.category === "cloth") product.style.display = "flex";
    else product.style.display = "none";
  });
};

function loadLocalStorage() {
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsed = JSON.parse(unParsedCart);
    inCart.item = [...parsed.item];
    inCart.totalPrice = parsed.totalPrice;
    console.log(inCart);
  }
}

const addTocartHandel = (event) => {
  const newItem = {
    title: event.target.parentElement.parentElement.children[1].innerText,
    count: 1,
    price: event.target.parentElement.children[0].innerText,
  };

  let titleCunt = null;

  inCart.item.forEach((titleCheck) => {
    if (titleCheck.title === newItem.title) {
      titleCheck.count++;
      titleCunt = 1;
    }
  });

  if (titleCunt === null) inCart.item.push(newItem);

  inCart.totalPrice = inCart.item.reduce((acc, cur) => acc + cur.count * cur.price, 0);

  localStorage.setItem("cart", JSON.stringify(inCart));

  cartMessageBox.classList.remove("carthiiden");
  cartMessageBox.classList.add("animated-border-box");
  cartMessageBoxborde.classList.add("animated-border-box-glow");
  messageBoxItemName.innerText = event.target.parentElement.parentElement.children[1].innerText;

  setTimeout(() => {
    cartMessageBox.classList.remove("animated-border-box");
    cartMessageBoxborde.classList.remove("animated-border-box-glow");
    cartMessageBox.classList.add("carthiiden");
  }, 2000);
};

const cartHover = () => {
  cart.classList.remove("carthiiden");
  cart.classList.add("cartShow");
  cartp.innerText = inCart.totalPrice;

  inCart.item.forEach((productt) => {
    const newListItem = document.createElement("div");
    newListItem.id = "showitem";
    cart.prepend(newListItem);
    const newButtonRemove = document.createElement("button");
    newButtonRemove.innerHTML = "-";
    newButtonRemove.className = "buttonRemoveLi";
    newListItem.prepend(newButtonRemove);
    const newSpanNameList = document.createElement("span");
    newSpanNameList.innerHTML = productt.title + "  *  " + productt.count;
    newListItem.prepend(newSpanNameList);
  });
};

const cartLeave = () => {
  setTimeout(() => {
    cart.classList.add("carthiiden");
    cart.classList.remove("cartShow");

    for (const div of cart.children) {
      console.log(div.id);

      if (div.id === "showitem") cart.removeChild(div);
    }
    for (const div of cart.children) {
      console.log(div.id);

      if (div.id === "showitem") cart.removeChild(div);
    }
  }, 1000);
};

const changeCartItem = (e) => {
  if (e.target.classList.contains("buttonRemoveLi")) {
    clickedItem = e.target;
    clickedItem.parentElement.remove();
    console.log();
  }
};
window.addEventListener("load", () => {
  loadLocalStorage();
  searchWorld.addEventListener("keyup", searchByWord);
  searchPriceBTN.addEventListener("click", searchByPriceBTN);
  searchPrice.addEventListener("keyup", searchByPrice);
  BtnAll.addEventListener("click", btnAllClick);
  BtnTech.addEventListener("click", btnTechClick);
  BtnHealth.addEventListener("click", btnHealthClick);
  BtnCloth.addEventListener("click", btnClothlick);
  addToCardBTN.forEach((button) => {
    button.addEventListener("click", addTocartHandel);
  });
  zanbil.addEventListener("mouseover", cartHover);
  zanbil.addEventListener("mouseout", cartLeave);
  cart.addEventListener("click", changeCartItem);
});
