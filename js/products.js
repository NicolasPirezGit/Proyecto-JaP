//PMA y PMB = Precio Más Alto y Precio Más Bajo.
const ORDER_ASC_BY_PRICE = "PMA";
const ORDER_DESC_BY_PRICE = "PMB";
const ORDER_BY_RELEVANCE = "Relev";
var currentproductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentproductsArray.length; i++){
        let product = currentproductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
                
                if(buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1 || product.description.toLowerCase().indexOf(buscar) != -1) {
                    htmlContentToAppend += `
            
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-4">
                <a href="product-info.html">
                    <div class="card">
                        <img class="card-img-top" src="${product.imgSrc}" alt="${product.description}">
                        <hr>
                        <h4 class="card-text" style="text-align: center;">${product.name}</h4>
                        <hr>
                        <div class="card-body">
                            <p class="card-text mt-2">Precio: ${product.cost} ${product.currency}</p>
                            <p class="card-text mt-3" style="font-size: 14px;">${product.description}</p>
                            <small class="text-muted mt-2"> ${product.soldCount} vendidos</small>
                        </div>
                    </div>
                </a>
            </div>
            `
            }
        }

        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }

}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentproductsArray = productsArray;
    }

    currentproductsArray = sortProducts(currentSortCriteria, currentproductsArray);

    showProductsList();
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_DESC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("buscador").addEventListener("input", () => {
        buscar = document.getElementById("buscador").value.toLowerCase();

        showProductsList();
    });

    document.getElementById("clear-search").addEventListener("click", () => {
        document.getElementById("buscador").value = "";
        buscar = undefined;

        showProductsList();
    });
});