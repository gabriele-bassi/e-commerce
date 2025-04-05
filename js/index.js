const checkAuth = () => {
    if (!localStorage.getItem("user")) return window.location.href = "pages/login.html"
}
checkAuth()


const loadProducts = async () => {
    const products = fetch("../data/products.json")
    return (await products).json()
}

const openPage = (element) => {
    window.location.href = `pages/product.html?id=${element.id}`
}

const createCards = (products, container) => {
    products.forEach(p => {
        let card = document.createElement("div")
        let title = document.createElement("h3")
        let image = document.createElement("img")
        let desc = document.createElement("p")
        let price = document.createElement("h4")
        let button = document.createElement("button")

        card.className = "card"
        image.className = "img-product"
        desc.className = "product-desc"
        button.className = "product-btn"
        price.className = "product-price"

        title.textContent = p.title
        image.src = p.image
        desc.innerHTML = p.description
        button.textContent = "Scopri di più"
        price.textContent = `Prezzo : ${p.prezzo} €`
        button.onclick = () => openPage(p)

        card.appendChild(title)
        card.appendChild(image)
        card.appendChild(desc)
        card.appendChild(price)
        card.appendChild(button)
        container.appendChild(card)
    });
}

const loadPage = () => {
    let container = document.getElementById("container-page")
    loadProducts().then(products => {
        createCards(products, container)
        localStorage.setItem("products", JSON.stringify(products))
    })
}
document.addEventListener("DOMContentLoaded", () => loadPage())
