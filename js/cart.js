const loadCart = () => {
    let cart = JSON.parse(window.localStorage.getItem("cart"))
    return cart ? cart : [];
}

const calculateTotal = (cart) => {
    let sum = 0;
    cart.forEach((e) => {
        sum += parseFloat(e.prezzo)
    })
    return sum;
}

const makePdf = (cart) => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("Errore: jsPDF non è stato caricato correttamente!");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let data = cart.map(e => [e.title, `${e.prezzo} €`]);
    const tot = calculateTotal(cart);

    const margin = 10;
    const xPos = margin;
    let yPos = margin;

    doc.setFontSize(16);
    doc.text("Scontrino", xPos, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.text("Data: " + new Date().toLocaleString(), xPos, yPos);
    yPos += 8;

    doc.autoTable({
        head: [["Prodotto", "Prezzo"]],
        body: data,
        startY: yPos,
        margin: { top: 10, left: margin, right: margin },
        theme: 'grid',
        styles: {
            cellPadding: 5,
            fontSize: 10,
            valign: 'middle',
            halign: 'center',
        },
    });

    yPos += data.length * 16 + 20;

    doc.setFontSize(12);
    doc.text(`Prezzo totale della transazione: ${tot} €`, xPos, yPos);

    yPos += 10;
    doc.line(xPos, yPos, 200 - margin, yPos);
    yPos += 5;

    doc.setFontSize(8);
    doc.text("Grazie per il tuo acquisto!", xPos, yPos);
    doc.save(`scontrino_${new Date().toLocaleString()}.pdf`);
};


const removeItem = (id) => {
    let cart = loadCart()
    let element = cart.findIndex(item => item.id === id)
    cart.splice(element, 1)
    window.localStorage.setItem("cart", JSON.stringify(cart))
    window.location.reload()
}

const loadElements = () => {
    let container = document.getElementById("container-carrello")

    let cart = loadCart()

    if (cart.length === 0) {
        let message = document.createElement("h1")
        message.innerText = "Nessun elemento nel carrello"
        container.appendChild(message)
        return
    }

    cart.forEach(p => {
        let item = document.createElement("div")
        let title = document.createElement("h3")
        let price = document.createElement("p")
        let img = document.createElement("img")
        let btn = document.createElement("button")

        item.className = "cart-item"
        title.className = "cart-title"
        price.className = "cart-price"
        img.className = "cart-img"
        btn.className = "cart-btn"

        title.textContent = p.title
        price.textContent = `Prezzo : ${p.prezzo} €`
        img.src = p.image
        btn.innerHTML = "Rimuovi Elemento dal Carrello"
        btn.onclick = () => removeItem(p.id)

        item.appendChild(title)
        item.appendChild(price)
        item.appendChild(img)
        item.appendChild(btn)


        container.appendChild(item)

    });

    let totale = document.createElement("h3")
    const tot = calculateTotal(cart)
    totale.innerHTML = `Prezzo totale della transazione : ${tot} €`
    container.appendChild(totale)
    let printBtn = document.createElement("button")
    printBtn.className = "print-btn"
    printBtn.id = "download-btn"
    printBtn.innerText = "Stampa lo scontrino"
    printBtn.onclick = () => makePdf(cart)
    container.appendChild(printBtn)
}

document.addEventListener("DOMContentLoaded", () => loadElements())