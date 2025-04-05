let productElement

const getProduct = () => {
    const id = window.location.search.split("=")[1]
    let products = localStorage.getItem("products")

    products = JSON.parse(products)

    products.some(product => {
        if (product.id === id) {
            loadProductPage(product)
            productElement = product
        }
    })
}

const addToCart = () => {
    let cart = JSON.parse(window.localStorage.getItem("cart"))
    if (!cart) {
        cart = []
    }
    cart.push(productElement)
    window.localStorage.setItem("cart", JSON.stringify(cart))
}

const loadProductPage = (product) => {
    let title = document.getElementById("p-title")
    let img = document.getElementById("p-img")
    let price = document.getElementById("p-price")
    let btn = document.getElementById("p-btn")
    let desc = document.getElementById("p-desc")


    title.innerText = product.title
    img.src = product.image
    price.innerText = `Prezzo : ${product.prezzo} €`
    desc.innerText = product.description
    btn.innerText = "Aggiungi al carrello"

}


document.addEventListener("DOMContentLoaded", () => getProduct())