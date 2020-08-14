//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const INICIO = "file:///C:/Users/equipo/Desktop/Programaci%C3%B3n/1-%20JaP/FASE%202/Curso%20T%C3%A9cnico/Pr%C3%A1cticos/PROYECTO/Materiales/REPOSITORIO%20PROYECTO/Proyecto-JaP/index.html";


document.addEventListener("DOMContentLoaded", function(e){

   document.getElementById("submit").addEventListener("click", function(e){
       let email = document.getElementById("userE");
       let password = document.getElementById("userP");
       let camposCompletos = true;

       if(password.value === '' || email.value === '')
   })
});