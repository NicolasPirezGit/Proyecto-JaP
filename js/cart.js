
function calcTotal() {
    let total = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    
    for(let i = 0; i < subtotales.length; i++) {
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
    
    for(let i = 0; i < array.length; i++) {
        let currentProduct = array[i];

        let sub = currentProduct.unitCost;

        if(currentProduct.currency === "UYU") {
            htmlContentToAppend += `
                <tr id="subtotal-row">
                    <th scope="row">${i + 1}</th>
                    <td><img src="${currentProduct.src}" width="50px"></td>
                    <td style="width: 250px;">${currentProduct.name}</td>
                    <td>${currentProduct.currency} ${currentProduct.unitCost}</td>
                    <td><input type="number" id="product-count-${i}" onchange="calcSubtotal(${currentProduct.unitCost / 40}, ${i})" style="width: 70px;" value="1" min="1" required></td>
                    <td id="cart-subtotal-${i}" class="subtotal">${sub / 40}</td>
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
                    <td><input type="number" id="product-count-${i}" onchange="calcSubtotal(${currentProduct.unitCost}, ${i})" style="width: 70px;" value="1" min="1" required></td>
                    <td id="cart-subtotal-${i}" class="subtotal">${sub}</td>
                </tr>
            `;

            document.getElementById("cart-table-body").innerHTML = htmlContentToAppend; 
        }
        
    }
    calcTotal();
}


/*function calcShipping() {
    let subtotal = parseFloat(document.getElementById("cart-total").innerHTML);
    let shipping = 0;

    let checkedOptions = document.getElementsByName("shipping");
    console.log(checkedOptions.length);

    for(let i = 0; i < checkedOptions.length;) {
        if(checkedOptions[i].checked) {
            shipping = parseFloat(checkedOptions[i].value);
        }
    } 
    //El bucle parece repetirse infinitamente o no avanzar y traba la carga de la página. Resolver.

    let total = subtotal + shipping;

    document.getElementById("cart-total").innerHTML = total;
}*/



document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_DESAFIATE).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let cartProducts = resultObj.data.articles;
            
            showCartProducts(cartProducts);
        }
    });
});