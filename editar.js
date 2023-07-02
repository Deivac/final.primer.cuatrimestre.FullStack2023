// código para cartel de alerta. Nombre del TP y Autor
window.alert("Trabajo Final del Primer Cuatrimestre - Lemma David");

// código para hacer dinámico el título de la pestaña
let title = document.title;
window.addEventListener("blur", () => {
  document.title = "NO TE VAYAS =(";
}); // código que cambia el título original cuando se salen de la página
window.addEventListener("focus", () => {
  document.title = title;
}); // código que vuelve el título original cuando vuelve a la página

document.addEventListener("DOMContentLoaded", function () {
  var botonLogin = document.getElementById("botonLogin");
  var menudesplegable = document.querySelector(".menudesplegable");

  botonLogin.addEventListener("click", function () {
    menudesplegable.style.display = menudesplegable.style.display === "block" ? "none" : "block";
  }); // Agregar un evento de clic al botón para mostrar u ocultar el menú desplegable
});

// Funcion para activar el registro y desacribar las otras opciones del meno. tambien activa en consola el saludo general
function saludaryopenRegistro() {
  console.log("Hola Usuario, comenzemos con registrar tu identidad para poder acceder a todas las funciones de nuestra web") 
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "block";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "none";
  contenedorCalendario.style.display = "none";
}

// Funcion para activar el Login y desacrivar las demas opciones del menu
function openLogin() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "none";
  contenedorLogin.style.display = "block";
  contenedorLista.style.display = "none";
  contenedorCalendario.style.display = "none";
}

// Funcion para activar el la lista de tareas y desacrivar las demas opciones del menu
function openLista() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "none";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "block";
  contenedorCalendario.style.display = "none";
}

// Funcion para activar la lista de tareas (copio pego)
const CLAVE_LOCALSTORAGE = "lista_tareas";
document.addEventListener("DOMContentLoaded", () => {
  let tareas = []; // El arreglo global que vamos a manejar

  // Declaración de elementos del DOM
  const $contenedorTareas = document.querySelector("#contenedorTareas"),
    $btnGuardarTarea = document.querySelector("#btnAgregarTarea"),
    $inputNuevaTarea = document.querySelector("#inputNuevaTarea");

  // Escuchar clic del botón para agregar nueva tarea
  $btnGuardarTarea.onclick = () => {
    const tarea = $inputNuevaTarea.value;
    if (!tarea) {
      return;
    }
    tareas.push({
      tarea: tarea,
      terminada: false,
    });
    $inputNuevaTarea.value = "";
    guardarTareasEnAlmacenamiento();
    refrescarListaDeTareas();
  };

  const obtenerTareasDeAlmacenamiento = () => {
    const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
    if (posibleLista) {
      return posibleLista;
    } else {
      return [];
    }
  };

  const guardarTareasEnAlmacenamiento = () => {
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
  };

  // Definir función que refresca la lista de tareas a partir del arreglo global
  const refrescarListaDeTareas = () => {
    $contenedorTareas.innerHTML = "";
    for (const [indice, tarea] of tareas.entries()) {
      // Crear el enlace para eliminar la tarea
      const $enlaceParaEliminar = document.createElement("a");
      $enlaceParaEliminar.classList.add("enlace-eliminar");
      $enlaceParaEliminar.innerHTML = "&times;";
      $enlaceParaEliminar.href = "";
      $enlaceParaEliminar.onclick = (evento) => {
        evento.preventDefault();
        if (!confirm("¿Eliminar tarea?")) {
          return;
        }
        tareas.splice(indice, 1);
        // Guardar los cambios
        guardarTareasEnAlmacenamiento(tareas);
        refrescarListaDeTareas();
      };
      // El input para marcar la tarea como terminada
      const $checkbox = document.createElement("input");
      $checkbox.type = "checkbox";
      $checkbox.onchange = function () { // No es una función flecha porque quiero acceder al elemento a través de this
        if (this.checked) {
          tareas[indice].terminada = true;
        } else {
          tareas[indice].terminada = false;
        }
        guardarTareasEnAlmacenamiento(tareas);
        refrescarListaDeTareas();
      }

      // El span que llevará el contenido de la tarea
      const $span = document.createElement("span");
      $span.textContent = tarea.tarea;
      // Y finalmente el elemento de la lista
      const $li = document.createElement("li");
      // Verificamos si la tarea está marcada para marcar los elementos
      if (tarea.terminada) {
        $checkbox.checked = true;
        $span.classList.add("tachado");
      }
      $li.appendChild($checkbox);
      $li.appendChild($span);
      $li.appendChild($enlaceParaEliminar);
      $contenedorTareas.appendChild($li);
    }
  };
  // Llamar a la función la primera vez
  tareas = obtenerTareasDeAlmacenamiento();
  refrescarListaDeTareas();
});

// funcion para que se abra la primer galeria con onclick
function openGaleria1() {
  var slider = document.getElementById("slider");
  slider.style.display = "block";
}

// funcion para que se abra la segunda galeria con onclick
function openGaleria2() {
  var carruselContenido = document.getElementById("carrusel-contenido");
  carruselContenido.style.display = "block";
}

// funcion para que se abran los mensajes de dia y semana con onclick
function mostrarMensaje(mensaje) {
  alert(mensaje);
}

// Funcion para activar el MES y desactivar las demas opciones del menu
function openbotonmes() {
  var contenedorCalendario = document.getElementById("contenedorCalendario");

  contenedorRegistro.style.display = "none";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "none";
  contenedorCalendario.style.display = "block";
}

// Funcion para volver a reiniciar la pagina
function openLimpieza() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");
  var slider = document.getElementById("slider");
  var carruselContenido = document.getElementById("carrusel-contenido");
  var contenedorCalendario = document.getElementById("contenedorCalendario");

  carruselContenido.style.display = "none"
  slider.style.display = "none"
  contenedorRegistro.style.display = "none";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "none";
  contenedorCalendario.style.display = "none";
}

// Funcion para avisar al usuario segun su nombre el registro correcto
function registroconsola(){
  let nodoInput = document.getElementById ("nombreInput");
  let nombre = nodoInput.value;
  console.log("Genial "+nombre+", ya validamos tu registro." );
}

