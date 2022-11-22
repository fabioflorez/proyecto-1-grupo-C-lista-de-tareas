("use strict");

/**
 * 
 * 
 * ANIMACIONES
 * 
 * 
 */

const NORMALbutton = document.getElementById("NORMAL");
const CheckEvent = document.getElementById("categoriaImportante");

CheckEvent.addEventListener("change", function () {
  NORMALbutton.classList.toggle("click");
  setTimeout(() => {
    NORMALbutton.classList.remove("click");
  }, 300);
  if (CheckEvent.checked === true) {
    NORMALbutton.innerHTML = "IMPORTANT";
  } else {
    NORMALbutton.innerHTML = "NORMAL";
  }
});

const SENDbutton = document.getElementById("SEND");

SENDbutton.addEventListener("click", () => {
  SENDbutton.classList.toggle("click");
  setTimeout(() => {
    SENDbutton.classList.remove("click");
  }, 300);
});

/**
 * 
 * 
 * ANIMACIONES DEL FONDO
 * 
 * (Crea un contrador en el evento de mouseover con en temporizador para evitar que la animación se corte y relizar al menos un ciclo completo cada vez que se active
 * 
 * 
 */


const INPUTbutton = document.getElementById("tarea");
const Orangething = document.getElementById("Orange");

INPUTbutton.onmouseover = function () {
  let delay = setTimeout(function () {
    Orangething.classList.add("animation");
    Orangething.classList.remove("animationinv");
  }, 1000);
  INPUTbutton.onmouseout = function () {
    clearTimeout(delay);
    setTimeout(function () {
      Orangething.classList.add("animationinv");
      Orangething.classList.remove("animation");
    }, 1000);
  };
};




/**
 * 
 * 
 * FUNCIONALIDAD CREACIÓN DE TAREAS Y ELIMINACIÓN
 * 
 * 
 */

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let SelectAllButtonReset = document.getElementById("SelectAll");

window.addEventListener("load", () => {
  const formularioTareas = document.querySelector("#formularioTareas");

  formularioTareas.addEventListener("submit", (event) => {
    event.preventDefault();

    const tarea = {
      texto: event.target.elements.tarea.value,
      categoria: event.target.elements.categoria.checked,
      completada: false,
      fecha: `${new Date().getDate()} - ${
        new Date().getMonth() + 1
      } - ${new Date().getFullYear()}`,
    };

    if (tarea.texto != "") {
      SelectAllButtonReset.checked = false;
      tareas.push(tarea);

      localStorage.setItem("tareas", JSON.stringify(tareas));
    }
    //Reseteo de Texto
    event.target.tarea.value = "";

    añadirTarea();
  });

  añadirTarea();
});




function añadirTarea() {
  const listaDeTareas = document.querySelector("#listaDeTareas");
  listaDeTareas.innerHTML = "";

  tareas.forEach((tarea) => {
    // <div class="tarea"></div>
    const nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("tarea");

    // <input class="checkbox"></input>
    const input = document.createElement("input");
    input.classList.add("checkbox");
    input.type = "checkbox";
    input.checked = tarea.completada;

    // <h4 class="textoTarea"></h4>
    const textoTarea = document.createElement("h4");
    textoTarea.classList.add("textoTarea");
    textoTarea.innerHTML = tarea.texto;

    // <h5 class="fecha"></h5>
    const fecha = document.createElement("h5");
    fecha.innerHTML = tarea.fecha;
    fecha.classList.add("fecha");

    nuevaTarea.appendChild(input);
    nuevaTarea.appendChild(textoTarea);
    nuevaTarea.appendChild(fecha);

    if (tarea.categoria === true) {
      nuevaTarea.classList.add("ImpTarea");
    } else if (tarea.categoria === false) {
    }

    listaDeTareas.appendChild(nuevaTarea);

    if (tarea.completada) {
      nuevaTarea.classList.add("hecha");
    }

    input.addEventListener("click", (event) => {
      tarea.completada = event.target.checked;

      localStorage.setItem("tareas", JSON.stringify(tareas));

      if (tarea.completada) {
        nuevaTarea.classList.add("hecha");
      } else {
        nuevaTarea.classList.remove("hecha");
      }
    });



    
    // BORRAR SELECCIÓN //

    const eliminarHechas = document.querySelector("#eliminarHechas");

    eliminarHechas.addEventListener("click", (event) => {
      SelectAllButtonReset.checked = false;
      tareas.forEach((tarea) => {
        if (tarea.completada === true) {
          tareas = tareas.filter((t) => t !== tarea);

          localStorage.setItem("tareas", JSON.stringify(tareas));
          añadirTarea();
        }
      });
    });




    // SELECCIONAR TODAS //

    let ALLcheckboxes = document.getElementsByClassName("checkbox");
    let SelectAll = document.getElementById("SelectAll");
    let ClaseTareas = document.getElementById("listaDeTareas").childNodes;

    SelectAll.onclick = (e) => {
      if (SelectAll.checked == true) {
        for (let i = 0; i < ClaseTareas.length; i++) {
          if (!ClaseTareas[i].classList.contains("hecha")) {
            ClaseTareas[i].classList.add("hecha");
          }
        }
        tareas.forEach((tarea) => {
          tarea.completada = true;
        });
        for (let i = 0; i < ALLcheckboxes.length; i++) {
          ALLcheckboxes[i].checked = true;
        }
      } else {
        for (let i = 0; i < ClaseTareas.length; i++) {
          if (ClaseTareas[i].classList.contains("hecha")) {
            ClaseTareas[i].classList.remove("hecha");
          }
        }
        tareas.forEach((tarea) => {
          tarea.completada = false;
        });
        for (let i = 0; i < ALLcheckboxes.length; i++) {
          ALLcheckboxes[i].checked = false;
        }
      }
    };




    // ELIMINAR TODAS //

    let DeleteAll = document.getElementById("DeleteAllLab");
    let ALLTareas = document.getElementById("listaDeTareas");

    DeleteAll.onclick = (e) => {
      localStorage.clear();
      tareas = [];
      while (ALLTareas.hasChildNodes()) {
        ALLTareas.removeChild(ALLTareas.lastChild);
      }
    };
  });
}
