let shop = document.getElementById('shop')





let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id = product-id-${id} class="item">
            <img width="220" src="${img}" alt="" >
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$${price}</h2>
                    <div class="buttons">   
                    <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${search.item === undefined ? 0: search.item}
                    </div>
                    <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `
    }).join(""));
    
}

generateShop();


let increment = (id) => {

    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    
    //console.log(basket);
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => { 
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    // If no item found in the basket, do nothing
    if (search === undefined) return;


    // if (search === undefined) return;
    // if (search.item === 0) {
    //     return;
    // } else {
    //     search.item -= 1;
    // }
    if (search === undefined || search.item === 0) {
        return;
    }

    if (search.item > 0) {
        search.item -= 1;
    }
    update(selectedItem);
    //basket = basket.filter((x) => x.item !== 0)
    basket = basket.filter((x) => x.item !== 0);
    //console.log(basket);
    
    localStorage.setItem("data", JSON.stringify(basket))
    
}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    if (search !== undefined) {
        document.getElementById(id).innerHTML = search.item;
    } else {
        document.getElementById(id).innerHTML = 0;
    }
    
    calculation();
}

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}

calculation();