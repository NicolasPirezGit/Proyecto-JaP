//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const INICIO = "https://nicolaspirezgit.github.io/Proyecto-JaP/cover";


document.addEventListener("DOMContentLoaded", function(e){

   document.getElementById("submit").addEventListener("click", function(){
       let inputEmail = document.getElementById("userE");
       let password = document.getElementById("userP");
       let camposCompletos = true;

       if(password.value === '' || inputEmail.value === ''){
           camposCompletos = false;
           alert("Debe rellenar todos los campos");
       }
       
       if(camposCompletos) {
           localStorage.setItem("User-Logged", JSON.stringify( {email: inputEmail.value} ));
           window.location.href = INICIO;
       }
   })
});

//RENOMBRAR ARCHIVO LOGIN POR INDEX PARA QUE AL INGRESAR VAYA DIRECTO AL LOGIN. AL INDEX (PORTADA DE LA PAGINA) LE PONEMOS OTRO NOMBRE. EJ: COVER.