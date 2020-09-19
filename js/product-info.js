//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var comment = {};


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }

}


function showRelatedProducts(array, arrayPositions) {

    let htmlContentToAppend = "";
    
    for (let i = 0; i < array.length; i++) {
        let currentRelProd = array[i];

        for(let x = 0; x < arrayPositions.length; x++) {

            if(i === arrayPositions[x]) {
                htmlContentToAppend += `
                
                    <div class="col-md-4">
                        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                            <img class="bd-placeholder-img card-img-top"  src=${currentRelProd.imgSrc}>
                            <h3 class="card-prod-title"><strong>${currentRelProd.name}</strong></h3>
                            <div class="card-body">
                                <p class="card-text">${currentRelProd.description}</p>
                            </div>
                        </a>
                    </div>
                    `

                document.getElementById("related-products-row").innerHTML = htmlContentToAppend;
            }
            
        }
        
        /*let currentRelProd = array[i];

        htmlContentToAppend += `
        <div class="row">
                <div class="col-md-4">
                  <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top"  src=${currentRelProd.imgSrc}>
                    <h3 class="card-prod-title"><strong>${currentRelProd.name}</strong></h3>
                    <div class="card-body">
                      <p class="card-text">${currentRelProd.description}</p>
                    </div>
                  </a>
                </div>
              </div>
        `

        document.getElementById("related-products-elements").innerHTML = htmlContentToAppend;*/  
    }

}


function showCommentsSection(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let currentComment = array[i];

        htmlContentToAppend += `
        <p id="userNameComm">${currentComment.user} dice:</p>
        <p id="commentBox">${currentComment.description}</p>
        `

        for(let i = 0; i < currentComment.score; i++) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`
        }

        for(let i = 0; i < (5 - currentComment.score); i++) {
            htmlContentToAppend +=`<span class="fa fa-star"></span>`
        }

        htmlContentToAppend +=`
        <p id="commentDateTime">Publicado: ${currentComment.dateTime}</p>
        <hr>
        <br>
        `;
        

        document.getElementById("commentsElements").innerHTML = htmlContentToAppend;

    }
    document.getElementById("publishCommentButton").addEventListener("click", () => {
        let userLogged = localStorage.getItem("User-Logged");
        let userScore = document.getElementById("userProductRank");

        let dateTime = new Date();
        let year = `${dateTime.getFullYear()}-`;
        let month = `${dateTime.getMonth()}-`;
        let day = `${dateTime.getDay()} `;
        let hour = `${dateTime.getHours()}:`;
        let minutes = `${dateTime.getMinutes()}:`;
        let seconds = `${dateTime.getSeconds()}`;
        let dateResult = year + month + day + hour + minutes + seconds;

        if(userLogged) {
            userLogged = JSON.parse(userLogged);
            
            htmlContentToAppend += `
        <p id="userNameComm">${userLogged.email} dice:</p>
        <p id="commentBox">${document.getElementById("userCommentBox").value}</p>
        `

        for(let i = 0; i < userScore.value; i++) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`
        }

        for(let i = 0; i < (5 - userScore.value); i++) {
            htmlContentToAppend +=`<span class="fa fa-star"></span>`
        }

        htmlContentToAppend +=`
        <p id="commentDateTime">Publicado: ${dateResult}</p>
        <hr>
        <br>
        `;
        
        document.getElementById("commentsElements").innerHTML = htmlContentToAppend;
        }
    
    });
}


function userCommentStyling() {

    document.getElementById("userCommentBox").addEventListener("focusin", () => {
        userCommentBox.style.borderWidth = "2.5px";
        userCommentBox.style.borderStyle = "solid";
        userCommentBox.style.borderColor = "#549bde";
    });

    document.getElementById("userCommentBox").addEventListener("focusout", ()=> {
        userCommentBox.style.borderWidth = "thin";
        userCommentBox.style.borderColor = "black";
    });

    document.getElementById("publishCommentButton").addEventListener("mouseover", () => {
        publishCommentButton.style.backgroundColor = "#1b40bb";
    });

    document.getElementById("publishCommentButton").addEventListener("mouseout", () => {
        publishCommentButton.style.backgroundColor = "#2450e0";
    });
    
}



document.addEventListener("DOMContentLoaded", () => {

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            
        }

        getJSONData(PRODUCTS_URL).then(function(resultObj) {
            if (resultObj.status === "ok") {
                let relatedProduct = resultObj.data;
                console.log(relatedProduct);

                let relatedProdNumbers = product.relatedProducts;
                let relatedProdArray = relatedProduct;
                console.log(relatedProdArray);
                
                showRelatedProducts(relatedProdArray, relatedProdNumbers);     
            }
        });

    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if(resultObj.status === "ok") {
            comment = resultObj.data;

            showCommentsSection(comment);
        }
    });
    userCommentStyling();

});