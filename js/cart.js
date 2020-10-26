
function calcTotal() {
    let total = 0;
    let subtotales = document.getElementsByClassName("subtotal");

    for (let i = 0; i < subtotales.length; i++) {
        total += parseFloat(subtotales[i].innerHTML);
    }

    document.getElementById("cart-total").innerHTML = total;
}


function calcSubtotal(productPrice, i) {
    let quantity = document.getElementById(`product-count-${i}`).value;
    let subtotal = productPrice * quantity;
    document.getElementById(`cart-subtotal-${i}`).innerHTML = subtotal;

    calcTotal();
}


function showCartProducts(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let currentProduct = array[i];

        let sub = currentProduct.unitCost;

        if (currentProduct.currency === "UYU") {
            htmlContentToAppend += `
                <tr id="subtotal-row">
                    <th scope="row">${i + 1}</th>
                    <td><img src="${currentProduct.src}" width="50px"></td>
                    <td style="width: 250px;">${currentProduct.name}</td>
                    <td>${currentProduct.currency} ${currentProduct.unitCost}</td>
                    <div id="product${i}Container">
                        <td><input type="number" class="productCount form-control" id="product-count-${i}" onchange="calcSubtotal(${currentProduct.unitCost / 40}, ${i}); calcTotalPlusShipping()" style="width: 70px;" value="2" min="1" required></td>
                    </div>
                    <td id="cart-subtotal-${i}" class="subtotal">${sub * 2 / 40}</td>
                </tr>
            `;

            document.getElementById("cart-table-body").innerHTML = htmlContentToAppend;
        }
        else {
            htmlContentToAppend += `
                <tr id="subtotal-row">
                    <th scope="row">${i + 1}</th>
                    <td><img src="${currentProduct.src}" width="50px"></td>
                    <td style="width: 250px;">${currentProduct.name}</td>
                    <td>${currentProduct.currency} ${currentProduct.unitCost}</td>
                    <div id="product${i}Container">
                        <td><input type="number" class="productCount form-control" id="product-count-${i}" onchange="calcSubtotal(${currentProduct.unitCost}, ${i}); calcTotalPlusShipping()" style="width: 70px;" value="1" min="1" required></td>
                    </div>
                    <td id="cart-subtotal-${i}" class="subtotal">${sub}</td>
                </tr>
            `;

            document.getElementById("cart-table-body").innerHTML = htmlContentToAppend;
        }

    }
    calcTotal();
}


function calcTotalPlusShipping() {
    let total = parseFloat(document.getElementById("cart-total").innerText);
    let standard = document.getElementById("radio-standard");
    let express = document.getElementById("radio-express");
    let premium = document.getElementById("radio-premium");
    let shippingCost = 0;

    if (standard.checked) {
        shippingCost = 5 * total / 100;
    }
    else if (express.checked) {
        shippingCost = 7 * total / 100;
    }
    else if (premium.checked) {
        shippingCost = 15 * total / 100;
    }

    let finalResult = total + shippingCost;

    document.getElementById("shipping-cost").innerText = shippingCost;
    document.getElementById("final-payment").innerText = finalResult;
}


function successfulBuy() {
    let cartBody = document.getElementById("cart-body");
    let dismissModal = document.getElementById("cart-buy-ready");
    let htmlContentToAppend = `
    <h3 id="successful-buy-msg">¡Tu orden de compra se ha registrado con éxito!</h3>
    <a id="cart-link-to-cover" href="cover.html">Volver a Inicio</a>
    `;

    dismissModal.setAttribute("data-dismiss", "modal");
    cartBody.innerHTML = htmlContentToAppend;

}


/*function showPaymentTypeNumber() {
    document.getElementById("payment-type").addEventListener("change", () => {
        let paymentType = document.getElementById("payment-type");

        for(let i = 0; i < paymentType.length; i++) {
            console.log("hola");
            if(paymentType[i] === paymentType[1] && paymentType[i].selected === true) {
                console.log("jaja");
                document.getElementById("credit-card-label").removeAttribute("style");
                document.getElementById("card-serial-number").removeAttribute("style");
            }
        }
    });
    
}*/


function cartValidation() {
    let cartProductCount = document.getElementsByClassName("productCount");
    let country = document.getElementById("client-country");
    let street = document.getElementById("client-street");
    let doorNumber = document.getElementById("client-door-number");
    let streetCorner = document.getElementById("client-street-corner");
    let paymentType = document.getElementById("payment-type"); 

    let cartBuy = document.getElementById("cart-buy");
    let cartReady = document.getElementById("cart-buy-ready")

    if(country.value ==="default") {
        country.setAttribute("class", "custom-select is-invalid");
        cartBuy.removeAttribute("data-target");
    }
    if(street.value === "") {
        street.setAttribute("class", "form-control local-address-fields is-invalid");
        cartBuy.removeAttribute("data-target");    
    } 
    if(doorNumber.value === "") {
        doorNumber.setAttribute("class", "form-control local-address-fields is-invalid");
        cartBuy.removeAttribute("data-target");
    }
    if(streetCorner.value === "") {
        streetCorner.setAttribute("class", "form-control local-address-fields is-invalid");
        cartBuy.removeAttribute("data-target");
    }
    
    for(let i = 0; i < cartProductCount.length; i++) {
        if(parseInt(cartProductCount[i].value) < 1) {
            cartProductCount[i].setAttribute("class", "productCount form-control is-invalid");
            let htmlContentToAppend = `
            <div class="invalid-feedback">
                La cantidad debe ser igual o mayor que 1.
            </div>
            `
            document.getElementById(`product${i}Container`).innerHTML += htmlContentToAppend;
            cartBuy.removeAttribute("data-target");
        }
    }

    if(paymentType.value === "select-payment-type") {
        paymentType.setAttribute("class", "form-control is-invalid");
        cartReady.removeAttribute("data-dismiss");
    }


    if(country.value !== "default" && street.value !== "" && doorNumber.value !== "" && streetCorner.value !== "") {
        let counter = 0;
        country.setAttribute("class", "custom-select");
        street.setAttribute("class", "form-control local-address-fields");
        doorNumber.setAttribute("class", "form-control local-address-fields");
        streetCorner.setAttribute("class", "form-control local-address-fields");

        for(let i = 0; i < cartProductCount.length; i++) {
            if(parseInt(cartProductCount[i].value) >= 1) {
                counter++;
            }
        }

        if(counter === cartProductCount.length) {
            cartBuy.setAttribute("data-target", "#cart-modal");
        }
    }

    if(paymentType.value !== "select-payment-type") {
        paymentType.setAttribute("class", "form-control")
        cartReady.setAttribute("data-dismiss", "modal");
    }

}



document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_DESAFIATE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let cartProducts = resultObj.data.articles;

            showCartProducts(cartProducts);
            calcTotalPlusShipping();
        }
    });

    document.getElementById("cart-buy").addEventListener("click", () => {
        cartValidation();
    });

    document.getElementById("cart-buy-ready").addEventListener("click", () => {
        successfulBuy();
    });
});