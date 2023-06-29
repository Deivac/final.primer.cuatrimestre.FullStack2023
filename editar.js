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
  var dropdownContent = document.querySelector(".dropdown-content");

  botonLogin.addEventListener("click", function () {
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  }); // Agregar un evento de clic al botón para mostrar u ocultar el menú desplegable
});

function openRegistro() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "block";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "none";
}

function openLogin() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "none";
  contenedorLogin.style.display = "block";
  contenedorLista.style.display = "none";
}

function openLista() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "none";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "block";
}


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