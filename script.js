const products = [
    {
        "name": "Arabica káva z Kolumbie",
        "price": 239,
        "description": "nabídněte svým zákazníkům vynikající kávu z kolumbijských kávových plantáží.",
    },
    {
        "name": "Espresso kapsle",
        "price": 239,
        "description": "kapsle jsou skvělý způsob, jak si vychutnat kávu rychle a snadno, nabídněte je v různých příchutích."
    },
    {
        "name": "Cukrářský sirup",
        "price": 239,
        "description": "nabídněte cukrářský sirup v různých příchutích, které zákazníci mohou přidat do své kávy a přidat tak zvláštní chuť."
    },
    {
        "name": "Keramické hrnky",
        "price": 239,
        "description": "krásné keramické hrnky jsou ideální pro pití kávy a jsou skvělým dárkem pro vaše zákazníky."
    },
    {
        "name": "French press",
        "price": 239,
        "description": "French press je skvělý způsob, jak si uvařit výbornou kávu přímo doma, nabídněte je v různých velikostech."
    },
]

var basket = []

const init = () => {
    const element = document.getElementById("products_row")
    for(const product of products) {
        const newDocument = document.createElement("div")
        newDocument.className = "col-6"
        newDocument.style="margin-bottom: 10px"
        newDocument.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2>${product.name}</h2>
                <hr>
                <p class="text-muted">
                    ${product.description}
                </p>
                <div class="row d-flex justify-content-center">
                    <div class="col-6 d-flex justify-content-center">
                        <span class="badge bg-success" style="font-size: 25px">${product.price},- Kč</span>
                    </div>
                    <div class="col-6 d-flex justify-content-center">
                        <button class="btn btn-success" id="btn_${product.name}">
                            Přidat do košíku
                        </button>
                    </div>
                </div>
            </div>
        `
        element.appendChild(newDocument)
        const button = document.getElementById("btn_" + product.name)
        button.onclick = () => {
            addToBasket(product.name)
        }
    }

}

const addToBasket = (id) => {
    const basketItem = basket.filter((basketI) => basketI.name === id)[0]
    console.log(basketItem)
    if(!basketItem) basket.push({
        name: id,
        count: 1
    })
    if(basketItem) {
        const newList = basket.filter((basketI) => basketI.name !== id)
        console.log(newList)
        basket = new Array()
        basket = newList
        basket.push({
            name: id,
            count: basketItem.count+1,  
        })
        console.log(basket)
    }
    updateBasket()
}

const updateBasket = () => {
    const basketItems = document.getElementById("basket_items")
    basketItems.innerHTML = ""
    var finalPrice = 0
    for(const basketItem of basket) {
        const p = document.createElement("p")
        const item = products.filter((product ) => product.name === basketItem.name)[0]
        if(item == null) return 
        p.innerText = item.name + " - " + item.price + ",- Kč - " + basketItem.count + " kusů"
        basketItems.append(p)
        finalPrice += item.price * basketItem.count
    }
    const hr = document.createElement("hr")
    basketItems.appendChild(hr)
    const finalPriceEl = document.createElement("p")
    finalPriceEl.innerHTML = "Fináln cena je <strong>" + finalPrice + ",- Kč</strong>"
    basketItems.appendChild(finalPriceEl)
}

init()